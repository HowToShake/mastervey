import { useAuth } from "@hooks/useAuth";
import { Container, Stack } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactElement } from "react";
import Navbar from "@components/Navbar";
import NavSurvey from "@components/NavSurvey";
import append from "react-hook-form/dist/utils/append";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateQuestionCardNew, {
  Question,
  QuestionTypes,
} from "@modules/GenerateSurvey/components/CreateQuestionCardNew";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createNewQuestion } from "@slices/createSurvey";
import Grid from "@mui/material/Grid";

const validationSchema = yup.object().shape({
  isAnonymous: yup.boolean(),
});

const GenerateNew = () => {
  const { user } = useAuth();
  const {
    query: { id },
  } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { data: survey } = useQuery("getSurvey", async () => {
    const { data } = await axios.get("getSurvey", { params: { name: id } });
    return data;
  });

  const { fields, remove, update, append } = useFieldArray({
    control,
    name: "dynamic",
  });

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column" }}>
      <form
        id="complaint-protocol"
        onSubmit={handleSubmit((data) => console.log("data", data))}
      >
        <Grid container spacing={2}>
          {fields?.map((field: Question, index: number) => {
            return (
              <Grid item xs={12}>
                <CreateQuestionCardNew
                  control={control}
                  update={update}
                  index={index}
                  question={field}
                />
              </Grid>
            );
          })}
        </Grid>
        <Button
          sx={{ mt: 5 }}
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
      </form>
    </Container>
  );
};

GenerateNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Navbar />
      <NavSurvey />
      {page}
    </>
  );
};

GenerateNew.requireAuth = true;

export default GenerateNew;
