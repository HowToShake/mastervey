import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import * as React from "react";
import SingleChoice from "@modules/PreviewSurvey/components/SingleChoice";
import MultipleChoice from "@modules/PreviewSurvey/components/MultipleChoice";
import ShortText from "@modules/PreviewSurvey/components/ShortText";
import LongText from "@modules/PreviewSurvey/components/LongText";
import Scale from "@modules/PreviewSurvey/components/Scale";
import DatePicker from "@modules/PreviewSurvey/components/Date";
import Time from "@modules/PreviewSurvey/components/Time";
import { uploadSurveyToCreateSurvey } from "@slices/createSurvey";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useGetSurveyQuery } from "../../../services/surveys";
import { ReactElement, useEffect } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import { useSaveAnswerMutation } from "../../../services/answers";

const PreviewSurvey = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: survey } = useGetSurveyQuery(id as string, {
    refetchOnMountOrArgChange: true,
  });

  const [saveAnswer, result] = useSaveAnswerMutation();

  const { answers } = useAppSelector((state) => state.createSurvey.answers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (survey?.create) {
      dispatch(
        uploadSurveyToCreateSurvey({
          // @ts-ignore
          survey,
        })
      );
    }
  }, [survey]);

  const save = async () => {
    try {
      const result = await saveAnswer({
        answer: answers,
        question: id,
      });

      console.log("saved!");
      console.log("result", result);
    } catch (e) {
      console.log("e === ", e);
    }
  };

  if (!survey?.create) {
    return null;
  }

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
        onClick={save}
      >
        Save
      </Button>
    </Container>
  );
};

PreviewSurvey.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <NavSurvey />
      {page}
    </>
  );
};

PreviewSurvey.requireAuth = true;

export default PreviewSurvey;
