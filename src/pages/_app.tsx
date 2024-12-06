import type { AppProps } from "next/app";
import { Chivo } from "next/font/google";
import { QuestionsProvider } from "@/hooks/useQuestions";
import { CommonProvider } from "@/hooks/useCommon";
import { Toaster } from "react-hot-toast";
import Container from "@/components/Container/Container";
import Header from "@/components/Header";
import "../styles/index.scss";

const chivo = Chivo({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={chivo.className}>
      <CommonProvider>
        <QuestionsProvider>
          <Toaster position="top-center" />

          <Header />

          <Component {...pageProps} />
        </QuestionsProvider>
      </CommonProvider>
    </Container>
  );
}
