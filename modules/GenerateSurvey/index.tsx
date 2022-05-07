import CreateQuestionCard from "./components/CreateQuestionCard";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createNewQuestion } from "../../slices/CreateSurvey";
import Box from "@mui/material/Box";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const GenerateSurvey = () => {
  const { user } = useAuth();
  const { createSurvey } = useAppSelector((state) => state.createSurvey);
  const dispatch = useAppDispatch();

  const saveSurvey = async () => {
    try {
      const res = await axios.post(
        "/saveSurvey",
        { create: createSurvey },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );

      console.log("res", res);
    } catch (e) {
      console.log("e === ", e);
    }
  };

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
            sx={{ width: "30%" }}
            color="error"
            variant="outlined"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            sx={{ width: "30%" }}
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
