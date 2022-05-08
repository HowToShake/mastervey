import CreateQuestionCard from "./components/CreateQuestionCard";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createNewQuestion,
  moveIncomingSurveyToCreateSurvey,
} from "../../slices/CreateSurvey";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const GenerateSurvey = () => {
  const { user } = useAuth();
  const { createSurvey } = useAppSelector((state) => state.createSurvey);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

  const saveSurvey = async () => {
    try {
      const res = await axios.post(
        "/saveSurvey",
        { create: createSurvey, name: id },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );

      console.log("res", res);
    } catch (e) {
      console.log("e === ", e);
    }
  };

  useEffect(() => {
    dispatch(
      moveIncomingSurveyToCreateSurvey({
        // @ts-ignore
        name: id,
      })
    );
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column" }}>
      {createSurvey?.map((question) => {
        return (
          <Box mt={2} mb={2}>
            <CreateQuestionCard id={question.id} />
          </Box>
        );
      })}
      <Button
        sx={{ mt: 5 }}
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => dispatch(createNewQuestion())}
      >
        Add question
      </Button>
      {createSurvey?.length !== 0 && (
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between" }}
          mb={3}
          mt={2}
        >
          <Button
            sx={{ width: "100%" }}
            color="success"
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={saveSurvey}
          >
            Save
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default GenerateSurvey;
