import CreateQuestionCard from "./components/CreateQuestionCard";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createNewQuestion } from "../../slices/CreateSurvey";
import Box from "@mui/material/Box";

const GenerateSurvey = () => {
  const { createSurvey } = useAppSelector((state) => state.createSurvey);
  const dispatch = useAppDispatch();

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
    </Container>
  );
};

export default GenerateSurvey;
