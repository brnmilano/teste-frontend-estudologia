import { useQuestions } from "@/hooks/useQuestions";
import { GetServerSideProps } from "next";
import { memo } from "react";
import { useCommon } from "@/hooks/useCommon";
import toast from "react-hot-toast";
import Head from "next/head";
import FinishModal from "./FinishModal";
import QuestionsByStep from "./QuestionsByStep";

interface QuestionProps {
  id: number;
}

function Questions({ id }: Readonly<QuestionProps>) {
  const { questionBook } = useQuestions();
  const { openModal } = useCommon();

  if (!questionBook) {
    return toast.error("Caderno de questões não encontrado");
  }

  return (
    <>
      <Head>
        <title>Questões | Estudologia</title>
        <meta property="og:title" content="Home | Estudologia" />
      </Head>

      <FinishModal open={openModal} />

      <QuestionsByStep id={id} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  return {
    props: {
      id: Number(id),
    },
  };
};

export default memo(Questions);
