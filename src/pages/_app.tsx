import Container from "@/components/Container/Container";
import type { AppProps } from "next/app";
import { Chivo } from "next/font/google";
import "../styles/index.scss";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";

const chivo = Chivo({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={chivo.className}>
      <Toaster position="top-center" />

      <Header />

      <Component {...pageProps} />
    </Container>
  );
}
