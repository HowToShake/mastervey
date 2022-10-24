import { useRouter } from "next/router";
import axios from "axios";
import { ReactElement } from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import SingleChoice from "../../modules/PreviewSurvey/components/SingleChoice";
import MultipleChoice from "../../modules/PreviewSurvey/components/MultipleChoice";
import ShortText from "../../modules/PreviewSurvey/components/ShortText";
import LongText from "../../modules/PreviewSurvey/components/LongText";
import Scale from "../../modules/PreviewSurvey/components/Scale";
import DatePicker from "../../modules/PreviewSurvey/components/Date";
import Time from "../../modules/PreviewSurvey/components/Time";
import SaveIcon from "@mui/icons-material/Save";
import * as React from "react";
import { dehydrate, QueryClient, useMutation } from "react-query";
import { Survey } from "@pages/dashboard/[id]/preview";
import { useAuth } from "@hooks/useAuth";
import { useGeolocated } from "react-geolocated";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import { QuestionTypes } from "@modules/GenerateSurvey/components/CreateQuestionCardNew";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import Link from "next/link";
import Box from "@mui/material/Box";

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

const SharePage = ({ survey }: { survey: Survey }) => {
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
      answers: survey?.create?.map(() => ({ answers: [] })),
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

  const save = async (data) => {
    try {
      // console.log("save data", data, "id", id);
      const result = await saveAnswer({
        answer: fields,
        question: survey.name,
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

  if (!survey.isPublic && !user) {
    return (
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", mb: 5 }}
      >
        <Typography textAlign="center" variant="h2" mb={3}>
          <b>Mastervey</b>
        </Typography>
        <Typography textAlign="center" mb={3}>
          You must be logged in to solve this survey.
        </Typography>
        <Typography textAlign="center" mb={3}>
          If you are not registered, please create an account on our website.
          You can do so by clicking on the link below.
        </Typography>
        <Typography textAlign="center" mb={3}>
          <Link href="/signup">Sign up</Link>
        </Typography>
        <Typography textAlign="center" mb={3}>
          If you already have an account, please log in by clicking on the link
          below.
        </Typography>
        <Typography textAlign="center" mb={3}>
          <Link href="/login">Sign in</Link>
        </Typography>
      </Container>
    );
  }

  console.log("ERRORS === ", errors);

  return (
    <Box
      sx={{
        bgcolor: survey?.bgcolor || "#FFF",
        minHeight: "100vh",
        height: "100%",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 5,
        }}
      >
        <Typography textAlign="center" variant="h3" mb={3}>
          <b>Preview</b>
        </Typography>
        <form id="resolve-survey" onSubmit={handleSubmit(save)}>
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
    </Box>
  );
};

SharePage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("getHashedSurvey", async () => {
    const { data } = await axios.get("getHashedSurvey", {
      params: { hash: context.params.id },
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

export default SharePage;
