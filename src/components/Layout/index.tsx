import { ReactElement } from "react";
import { Navbar } from "./Navbar";
import Head from "next/head";
import { Footer } from "./Footer";

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <div>
        <div className="min-h-screen">
          <Navbar />
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
