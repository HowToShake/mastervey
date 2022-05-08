import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import * as React from "react";
import SingleChoice from "./components/SingleChoice";
import MultipleChoice from "./components/MultipleChoice";
import ShortText from "./components/ShortText";
import LongText from "./components/LongText";
import Scale from "./components/Scale";
import DatePicker from "./components/Date";
import Time from "./components/Time";
import { useEffect } from "react";
import { setAnswersForQuestion } from "../../slices/CreateSurvey";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const PreviewSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const survey = useAppSelector((state) =>
    state.createSurvey.surveys?.find((survey) => survey?.name === id)
  );

  const { questionId, answers } = useAppSelector(
    (state) => state.createSurvey.answers
  );

  const dispatch = useAppDispatch();

  const saveAnswer = async () => {
    try {
      const res = await axios.post("/saveAnswer", {
        answer: answers,
        question: questionId,
      });

      console.log("res", res);
    } catch (e) {
      console.log("e === ", e);
    }
  };

  if (!survey?.create) {
    return null;
  }

  useEffect(() => {
    dispatch(
      setAnswersForQuestion({
        // @ts-ignore
        questionId: id,
      })
    );
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Typography textAlign="center" variant="h3">
        Preview
      </Typography>
      {survey?.create?.map((question) => {
        switch (question.type) {
          case "singleChoice": {
            return (
              <Box mt={2} mb={2}>
                <SingleChoice question={question} />
              </Box>
            );
          }
          case "multipleChoice": {
            return (
              <Box mt={2} mb={2}>
                <MultipleChoice question={question} />
              </Box>
            );
          }
          case "shortText": {
            return (
              <Box mt={2} mb={2}>
                <ShortText question={question} />
              </Box>
            );
          }
          case "longText": {
            return (
              <Box mt={2} mb={2}>
                <LongText question={question} />
              </Box>
            );
          }
          case "scale": {
            return (
              <Box mt={2} mb={2}>
                <Scale question={question} />
              </Box>
            );
          }
          case "date": {
            return (
              <Box mt={2} mb={2}>
                <DatePicker question={question} />
              </Box>
            );
          }
          case "time": {
            return (
              <Box mt={2} mb={2}>
                <Time question={question} />
              </Box>
            );
          }
          default:
            return null;
        }
      })}

      <Button
        sx={{ width: "100%" }}
        color="success"
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={saveAnswer}
      >
        Save
      </Button>
    </Container>
  );
};

export default PreviewSurvey;
