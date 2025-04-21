import "./globals.css";
import { Providers } from "@/store/Provider";

export const metadata = {
  title: "Your App",
  description: "Chat & More",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
