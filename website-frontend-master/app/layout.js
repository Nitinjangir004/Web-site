import { Montserrat, Kalam } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReduxProvider from "../components/providers/ReduxProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Churanchacha Website",
  description: "Churanchacha official website",
  icons: {
    icon: '/logo/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${kalam.variable} antialiased bg-white flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <Header />
      
          <main className="flex-grow container mx-auto justify-center p-4 mt-[60px] lg:mt-[96px]">
            {children}
          </main>
          
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
