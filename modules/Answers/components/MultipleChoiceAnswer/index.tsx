import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FC } from "react";
import { AnswerProps } from "@pages/dashboard/[id]/preview";

const MultipleChoiceAnswer: FC<Partial<AnswerProps>> = ({
  question,
  answers,
}) => {
  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h4">{question?.question}</Typography>
        </Box>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            {question?.options?.map((option) => {
              return (
                <FormControlLabel
                  key={option.text}
                  control={
                    <Checkbox
                      checked={answers?.some(
                        (answer) => answer === option.text
                      )}
                      name={option.text}
                    />
                  }
                  label={option.text}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default MultipleChoiceAnswer;
