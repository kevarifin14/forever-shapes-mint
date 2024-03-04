import axios from "axios";
import { Button, ButtonProps } from "../Button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { base64 } from "@metaplex-foundation/umi/serializers";
import {
  VersionedTransaction,
  VersionedTransactionResponse,
} from "@solana/web3.js";
import { renderNotification } from "../Notification";
import { useToggle } from "@/hooks/useToggle";
import { useBalance } from "@/hooks/useBalance";
import { usePrice } from "@/hooks/usePrice";
import { useAllEscrowedAssets } from "@/hooks/useAllEscrowedAssets";
import { sleep } from "@/lib";

type MintButtonProps = ButtonProps;

export const MintButton: React.FC<MintButtonProps> = (buttonProps) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const price = usePrice();

  const { data: balance, refetch: refetchBalance } = useBalance();
  const { data: escrowedAssets, refetch: refetchAllEscrowedAssets } =
    useAllEscrowedAssets();

  const [loading, toggleLoading] = useToggle();

  const handleMint = async () => {
    if (wallet.publicKey && wallet.signTransaction) {
      toggleLoading();

      try {
        const response = await axios.post("/api/mint", {
          account: wallet.publicKey.toBase58(),
        });

        const transaction = VersionedTransaction.deserialize(
          base64.serialize(response.data.transaction)
        );

        const signedTransaction = await wallet.signTransaction(transaction);
        const signedAndSerializedTransaction = signedTransaction.serialize();

        for (
          let sendTransactionRetries = 0;
          sendTransactionRetries < 10;
          sendTransactionRetries++
        ) {
          const signature = await connection.sendRawTransaction(
            signedAndSerializedTransaction
          );

          let confirmation: VersionedTransactionResponse | null;

          for (
            let confirmTransactionRetries = 0;
            confirmTransactionRetries < 10;
            confirmTransactionRetries++
          ) {
            confirmation = await connection.getTransaction(signature, {
              maxSupportedTransactionVersion: 0,
              commitment: "confirmed",
            });

            if (confirmation) {
              await refetchAllEscrowedAssets();

              await refetchBalance();

              renderNotification({
                title: "Successfully minted",
                description: "Check your wallet for the new NFT",
              });

              toggleLoading();

              return;
            }

            await sleep(1000);
          }
        }

        await refetch();

        renderNotification({
          title: "Successfully minted",
          description: "Check your wallet for the new NFT",
        });
      } catch (e) {
        renderNotification({
          title: "Failed to mint",
          description: "Please sign the transaction to mint",
        });
      }

      toggleLoading();
    }
  };

  const enoughSol = balance && balance > price;
  const soldOut = escrowedAssets?.length === 0;

  return (
    <Button
      onClick={handleMint}
      loading={loading}
      disabled={soldOut || !enoughSol || loading}
      {...buttonProps}
    >
      {soldOut
        ? "Sold Out"
        : !enoughSol
        ? "Not enough SOL"
        : buttonProps.children}
    </Button>
  );
};
