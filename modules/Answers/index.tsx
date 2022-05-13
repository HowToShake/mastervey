import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import AnswerCard from "./components/AnswerCard";
import Container from "@mui/material/Container";
import { useQuery } from "react-query";

const Answers = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const { data: answers = [] } = useQuery(
    "answers",
    async () => {
      const { data } = await axios.get("/getAnswers", {
        params: {
          question: id,
        },
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      return data;
    },
    {
      enabled: !!user?.accessToken,
    }
  );

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

export default Answers;
