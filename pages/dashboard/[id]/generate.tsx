import { Container, FormControlLabel, Switch } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactElement, useEffect } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import Button from "@mui/material/Button";
import CreateQuestionCardNew, {
  Question,
  QuestionTypes,
} from "@modules/GenerateSurvey/components/CreateQuestionCardNew";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const validationSchema = yup.object().shape({
  isPublic: yup.boolean(),
});

const Generate = () => {
  const {
    query: { id },
  } = useRouter();

  const { data: survey } = useQuery("getSurvey", async () => {
    const { data } = await axios.get("getSurvey", { params: { name: id } });
    return data;
  });

  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isLoading } = useMutation(
    "saveSurvey",
    async (input: { create: Question[]; isPublic: string }) => {
      const { data } = await axios.post("saveSurvey", {
        create: input?.create,
        name: id,
      });
      return data;
    }
  );

  const { fields, remove, update, append } = useFieldArray({
    control,
    name: "create",
  });

  useEffect(() => {
    setValue("create", survey?.create);
  }, [survey]);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", mb: 5 }}
    >
      {/*@ts-ignore*/}
      <form id="generate-survey" onSubmit={handleSubmit(mutateAsync)}>
        <Grid container spacing={2}>
          {fields?.map((field: Question, index: number) => {
            return (
              <Grid item xs={12}>
                <CreateQuestionCardNew
                  remove={remove}
                  control={control}
                  update={update}
                  index={index}
                  question={field}
                />
              </Grid>
            );
          })}
        </Grid>
      </form>
      <Button
        sx={{ mt: 5, mb: 2 }}
        variant="outlined"
        fullWidth
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          append({
            question: "",
            options: [],
            type: QuestionTypes.SINGLECHOICE,
          })
        }
      >
        Add question
      </Button>
      <LoadingButton
        variant="outlined"
        fullWidth
        startIcon={<SaveIcon />}
        loading={isLoading}
        type="submit"
        form="generate-survey"
      >
        Save
      </LoadingButton>
    </Container>
  );
};

Generate.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <NavSurvey />
      {page}
    </>
  );
};

Generate.requireAuth = true;

export default Generate;
