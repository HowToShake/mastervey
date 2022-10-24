import { ReactElement } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { QuestionTypes } from "@modules/GenerateSurvey/components/CreateQuestionCardNew";
import * as React from "react";
import { dehydrate, QueryClient } from "react-query";
import axios from "axios";
import { AnswerProps, Survey } from "@pages/dashboard/[id]/preview";
import SingleChoiceAnswer from "@modules/Answers/components/SingleChoiceAnswer";
import MultipleChoiceAnswer from "@modules/Answers/components/MultipleChoiceAnswer";
import ShortTextAnswer from "@modules/Answers/components/ShortTextAnswer";
import LongTextAnswer from "@modules/Answers/components/LongTextAnswer";
import ScaleAnswer from "@modules/Answers/components/ScaleAnswer";
import DatePickerAnswer from "@modules/Answers/components/DatePickerAnswer";
import TimePickerAnswer from "@modules/Answers/components/TimePickerAnswer";

const DetailedAnswer = ({
  id,
  survey,
  answers,
}: {
  id: string;
  survey: Survey;
  answers: AnswerProps;
}) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", mb: 5 }}
    >
      <Typography textAlign="center" variant="h3" mb={3}>
        <b>Answer {id}</b>
      </Typography>
      <Grid container spacing={2}>
        {survey?.create?.map((question, index) => {
          switch (question.type) {
            case QuestionTypes.SINGLECHOICE: {
              return (
                <Grid item xs={12}>
                  <SingleChoiceAnswer
                    question={question}
                    answers={answers[question.id]}
                  />
                </Grid>
              );
            }
            case QuestionTypes.MULTIPLECHOICE: {
              return (
                <Grid item xs={12}>
                  <MultipleChoiceAnswer
                    question={question}
                    answers={answers[question.id]}
                  />
                </Grid>
              );
            }
            case QuestionTypes.SHORTTEXT: {
              return (
                <Grid item xs={12}>
                  <ShortTextAnswer
                    question={question}
                    answers={answers[question.id]}
                  />
                </Grid>
              );
            }
            case QuestionTypes.LONGTEXT: {
              return (
                <Grid item xs={12}>
                  <LongTextAnswer
                    question={question}
                    answers={answers[question.id]}
                  />
                </Grid>
              );
            }
            case QuestionTypes.SCALE: {
              return (
                <Grid item xs={12}>
                  <ScaleAnswer
                    question={question}
                    answers={answers[question.id]}
                  />
                </Grid>
              );
            }
            case QuestionTypes.DATE: {
              return (
                <Grid item xs={12}>
                  <DatePickerAnswer
                    question={question}
                    answers={answers[question.id]}
                  />
                </Grid>
              );
            }
            case QuestionTypes.TIME: {
              return (
                <Grid item xs={12}>
                  <TimePickerAnswer
                    question={question}
                    answers={answers[question.id]}
                  />
                </Grid>
              );
            }
            default:
              return null;
          }
        })}
      </Grid>
    </Container>
  );
};

DetailedAnswer.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <NavSurvey />
      {page}
    </>
  );
};

DetailedAnswer.requireAuth = true;

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getSurvey", async () => {
    const { data } = await axios.get("getSurvey", {
      params: { name: context.params.id },
    });
    return data;
  });

  const survey = dehydrate(queryClient).queries?.[0]?.state?.data || [];

  //@ts-ignore
  const answers = survey?.answers?.find(
    (answer) => answer.id === context.params.answer
  )?.userAnswers;

  const hashedAnswers = {};

  answers?.map((answer) => {
    hashedAnswers[answer.questionId] = answer.answers;
  });

  return {
    props: {
      id: context.params.answer,
      survey,
      answers: hashedAnswers,
    },
  };
}

export default DetailedAnswer;
