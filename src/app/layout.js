
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientPreloader from "./ClientPreloader";





const myFont = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});



export const metadata = {
  title: "LUXIMA Studio | Creative Studio",
  description: "Generated by LUXIMA.ID",
};

export default function RootLayout({ children }) {

  
  return (
    <html lang="en">
      <body className={myFont.variable} suppressHydrationWarning={true}>
         
          <ClientPreloader>{children}</ClientPreloader>
          {/* <Menu />
          {children}
          <BacktoTop/> */}
      </body>
    </html>
  );
}
