import Box from "@mui/material/Box";
import { useAppSelector } from "../../hooks/redux";
import { useRouter } from "next/router";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShortTextIcon from "@mui/icons-material/ShortText";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import * as React from "react";
import SingleChoice from "./components/SingleChoice";
import MultipleChoice from "./components/MultipleChoice";
import ShortText from "./components/ShortText";
import LongText from "./components/LongText";
import Scale from "./components/Scale";
import Date from "./components/Date";
import Time from "./components/Time";

const availableTypes = [
  { type: "singleChoice", icon: PanoramaFishEyeIcon },
  { type: "multipleChoice", icon: CheckBoxIcon },
  { type: "shortText", icon: ShortTextIcon },
  { type: "longText", icon: FormatAlignJustifyIcon },
  { type: "scale", icon: LinearScaleIcon },
  { type: "date", icon: EventIcon },
  { type: "time", icon: AccessTimeIcon },
];

const PreviewSurvey = () => {
  const router = useRouter();
  const { id } = router.query;
  const survey = useAppSelector((state) =>
    state.createSurvey.surveys?.find((survey) => survey?.name === id)
  );

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
                <MultipleChoice
                  question={question.question}
                  typeOptions={question.typeOptions}
                />
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
                <LongText
                  question={question.question}
                  required={question.required}
                />
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
                <Date question={question.question} />
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
