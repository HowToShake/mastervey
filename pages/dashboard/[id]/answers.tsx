import { useRouter } from "next/router";
import AnswerCard from "@modules/Answers/components/AnswerCard";
import Container from "@mui/material/Container";
import { useGetAnswersQuery } from "../../../services/answers";
import { ReactElement } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";

const Answers = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: answers = [] } = useGetAnswersQuery(id as string);

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
