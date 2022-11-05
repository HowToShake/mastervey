import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import * as React from "react";
import { ReactElement } from "react";
import SingleChoice from "@modules/PreviewSurvey/components/SingleChoice";
import MultipleChoice from "@modules/PreviewSurvey/components/MultipleChoice";
import ShortText from "@modules/PreviewSurvey/components/ShortText";
import LongText from "@modules/PreviewSurvey/components/LongText";
import Scale from "@modules/PreviewSurvey/components/Scale";
import DatePicker from "@modules/PreviewSurvey/components/Date";
import Time from "@modules/PreviewSurvey/components/Time";
import SaveIcon from "@mui/icons-material/Save";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import { dehydrate, QueryClient, useMutation } from "react-query";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import {
  Question,
  QuestionTypes,
} from "@modules/GenerateSurvey/components/CreateQuestionCardNew";
import Grid from "@mui/material/Grid";
import { useAuth } from "@hooks/useAuth";
import { useGeolocated } from "react-geolocated";
import SurveyBreadcrumbs from "@components/SurveyBreadcrumbs";

const validationSchema = yup.object().shape({
  answers: yup
    .object()
    .shape({
      id: yup.string(),
      answers: yup.array(),
    })
    .nullable(),
  meta: yup.object().shape({
    resolvedAt: yup.string(),
    resolvedBy: yup.string(),
    resolvedInPlace: yup.object().shape({
      latitude: yup.string(),
      longitude: yup.string(),
    }),
  }),
});

interface Answer {
  id: string;
  answers: string[];
  questionId: string;
  question: string;
}

export interface Survey {
  answers: Answer[];
  name: string;
  create: Question[];
  isPublic: boolean;
  userId: string;
  shareLink: string;
  bgcolor: string;
}

export interface AnswerProps {
  question: Question;
  index: number;
  update: (index: number, value: unknown) => void;
  answers?: string[];
}

const PreviewSurvey = ({ survey }: { survey: Survey }) => {
  const { user } = useAuth();
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const {
    query: { id },
  } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      answers: survey?.create.map(() => ({ answers: [] })),
    },
  });

  const { fields, update } = useFieldArray({
    control,
    name: "answers",
  });

  const { mutateAsync: saveAnswer, isLoading: isSaving } = useMutation(
    "saveAnswer",
    async (body: any) => {
      const { data } = await axios.post("saveAnswer", body);
      return { data };
    }
  );

  const save = async () => {
    try {
      const result = await saveAnswer({
        answer: fields,
        question: id,
        meta: {
          resolvedAt: new Date(),
          resolvedBy:
            {
              uid: user?.uid,
              email: user?.email,
            } || "anonymous",
          resolvedInPlace: {
            latitude: coords?.latitude || -1,
            longitude: coords?.longitude || -1,
          },
        },
      });

      console.log("saved!");
      console.log("result", result);
    } catch (e) {
      console.log("e === ", e);
    }
  };

  return (
    <>
      <SurveyBreadcrumbs path={id} subPath="preview" sx={{ my: 2, ml: 3 }} />

      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", mb: 5 }}
      >
        <Typography textAlign="center" variant="h3" mb={3}>
          <b>Preview</b>
        </Typography>
        <form
          id="resolve-survey"
          onSubmit={handleSubmit(async (data) => await save())}
        >
          <Grid container spacing={2}>
            {survey?.create?.map((question, index) => {
              switch (question.type) {
                case QuestionTypes.SINGLECHOICE: {
                  return (
                    <Grid item xs={12}>
                      <SingleChoice
                        question={question}
                        index={index}
                        update={update}
                      />
                    </Grid>
                  );
                }
                case QuestionTypes.MULTIPLECHOICE: {
                  return (
                    <Grid item xs={12}>
                      <MultipleChoice
                        question={question}
                        index={index}
                        update={update}
                        answers={fields?.[index]?.answers}
                      />
                    </Grid>
                  );
                }
                case QuestionTypes.SHORTTEXT: {
                  return (
                    <Grid item xs={12}>
                      <ShortText
                        question={question}
                        index={index}
                        update={update}
                        answers={fields?.[index]?.answers}
                      />
                    </Grid>
                  );
                }
                case QuestionTypes.LONGTEXT: {
                  return (
                    <Grid item xs={12}>
                      <LongText
                        question={question}
                        index={index}
                        update={update}
                        answers={fields?.[index]?.answers}
                      />
                    </Grid>
                  );
                }
                case QuestionTypes.SCALE: {
                  return (
                    <Grid item xs={12}>
                      <Scale
                        question={question}
                        index={index}
                        update={update}
                        answers={fields?.[index]?.answers}
                      />
                    </Grid>
                  );
                }
                case QuestionTypes.DATE: {
                  return (
                    <Grid item xs={12}>
                      <DatePicker
                        question={question}
                        index={index}
                        update={update}
                        answers={fields?.[index]?.answers}
                      />
                    </Grid>
                  );
                }
                case QuestionTypes.TIME: {
                  return (
                    <Grid item xs={12}>
                      <Time
                        question={question}
                        index={index}
                        update={update}
                        answers={fields?.[index]?.answers}
                      />
                    </Grid>
                  );
                }
                default:
                  return null;
              }
            })}
          </Grid>
        </form>

        <LoadingButton
          loading={isSaving}
          sx={{ width: "100%", mt: 3 }}
          color="success"
          variant="outlined"
          startIcon={<SaveIcon />}
          type="submit"
          form="resolve-survey"
        >
          Save
        </LoadingButton>
      </Container>
    </>
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

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getSurvey", async () => {
    const { data } = await axios.get("getSurvey", {
      params: { name: context.params.id },
    });
    return data;
  });

  const data = dehydrate(queryClient).queries?.[0]?.state?.data || [];

  return {
    props: {
      survey: data,
    },
  };
}

export default PreviewSurvey;
