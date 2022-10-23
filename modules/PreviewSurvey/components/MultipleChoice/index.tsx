import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FC } from "react";
import { AnswerProps } from "@pages/dashboard/[id]/preview";

const MultipleChoice: FC<AnswerProps> = ({
  question,
  index,
  update,
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
              const isChecked = answers?.includes(option.text) || false;
              return (
                <FormControlLabel
                  key={option.text}
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => {
                        const answer = e.target.name;

                        const isAnswerAlreadyChecked =
                          answers?.includes(answer);

                        if (isAnswerAlreadyChecked) {
                          const newAnswers = answers.filter(
                            (value) => value !== answer
                          );

                          return update(index, {
                            questionId: question.id,
                            answers: newAnswers,
                          });
                        }

                        return update(index, {
                          questionId: question.id,
                          answers: [...(answers || []), answer],
                        });
                      }}
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

export default MultipleChoice;
