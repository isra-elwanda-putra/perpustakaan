import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Perpustakaan SMPN 1 Warungkiara",
  description: "perpustakaan SMP merupakan sebuah fasilitas penting yang mendukung kegiatan belajar-mengajar di sekolah. Perpustakaan ini menyediakan berbagai jenis sumber daya informasi yang dapat di akses oleh siswa, guru, dan staf sekolah. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
