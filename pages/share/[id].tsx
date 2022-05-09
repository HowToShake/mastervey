import PreviewSurvey from "../../modules/PreviewSurvey";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import axios from "axios";
import { useEffect } from "react";
import { setAnswersForQuestion } from "../../slices/CreateSurvey";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SingleChoice from "../../modules/PreviewSurvey/components/SingleChoice";
import MultipleChoice from "../../modules/PreviewSurvey/components/MultipleChoice";
import ShortText from "../../modules/PreviewSurvey/components/ShortText";
import LongText from "../../modules/PreviewSurvey/components/LongText";
import Scale from "../../modules/PreviewSurvey/components/Scale";
import DatePicker from "../../modules/PreviewSurvey/components/Date";
import Time from "../../modules/PreviewSurvey/components/Time";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import * as React from "react";
import { useQuery } from "react-query";

const SharePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { answers, questionId } = useAppSelector(
    (state) => state.createSurvey.answers
  );

  const { data } = useQuery(
    "survey",
    () =>
      axios.get(`getSurvey`, {
        params: { name: id },
      }),
    { enabled: !!id }
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

  useEffect(() => {
    dispatch(
      setAnswersForQuestion({
        // @ts-ignore
        questionId: id,
      })
    );
  }, [id]);

  console.log("data", data);

  return (
    <Container maxWidth="lg">
      <Typography textAlign="center" variant="h3">
        Preview
      </Typography>
      {data?.data?.create?.map((question) => {
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

export default SharePage;
