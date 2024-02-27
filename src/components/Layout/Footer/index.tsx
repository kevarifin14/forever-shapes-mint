export const Footer = () => {
  return (
    <footer className="flex justify-center py-4 border-t border-dark-200">
      <span className="text-dark-accent">{`© ${new Date().getFullYear()} ${
        process.env.NEXT_PUBLIC_APP_NAME
      }`}</span>
    </footer>
  );
};
