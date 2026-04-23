import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CLAC",
  description: "Cognitive Load-Aware Calendar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}