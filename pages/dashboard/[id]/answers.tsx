import { useRouter } from "next/router";
import AnswerCard from "@modules/Answers/components/AnswerCard";
import Container from "@mui/material/Container";
import { ReactElement } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import { useQuery } from "react-query";
import axios from "axios";

const Answers = () => {
  const {
    query: { id },
  } = useRouter();

  const { data: answers = [] } = useQuery("getAnswers", async () => {
    const { data } = await axios.get("getAnswers", {
      params: {
        question: id,
      },
    });
    return data;
  });

  const mergeResults = (arr) => {
    let newResults = {};

    for (let i = 0; i < arr.length; i++) {
      const { questionId, answers } = arr[i];

      if (!(questionId in newResults)) {
        newResults[questionId] = [...answers];
      } else {
        newResults[questionId] = [...newResults[questionId], ...answers];
      }
    }

    return newResults;
  };

  const mergedResults = mergeResults(answers);

  return (
    <>
      {Object.keys(mergedResults).map((obj) => {
        return (
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <AnswerCard answerId={obj} answerValue={mergedResults[obj]} />
          </Container>
        );
      })}
    </>
  );
};

Answers.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <NavSurvey />
      {page}
    </>
  );
};

Answers.requireAuth = true;

export default Answers;
