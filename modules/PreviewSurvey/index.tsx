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

const PreviewSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const survey = useAppSelector((state) =>
    state.createSurvey.surveys?.find((survey) => survey?.name === id)
  );
  const dispatch = useAppDispatch();

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
                <SingleChoice
                  question={question.question}
                  typeOptions={question.typeOptions}
                />
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
                <ShortText
                  question={question.question}
                  required={question.required}
                />
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
                <Scale
                  question={question.question}
                  typeOptions={question.typeOptions}
                />
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
                <Time question={question.question} />
              </Box>
            );
          }
          default:
            return null;
        }
      })}
    </Container>
  );
};

export default PreviewSurvey;
