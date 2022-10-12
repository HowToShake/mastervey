import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateAnswer } from "@slices/createSurvey";

const MultipleChoice = ({ question }) => {
  const answers = useAppSelector((state) =>
    state.createSurvey.answers.answers.find(
      (que) => que.questionId === question?.id
    )
  );

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = event.target.name;

    if (answers?.answers?.includes(response)) {
      const newState = answers?.answers?.filter((value) => value !== response);

      return dispatch(
        updateAnswer({
          //@ts-ignore
          id: question.id,
          answers: newState,
        })
      );
    }
    return dispatch(
      updateAnswer({
        //@ts-ignore
        id: question.id,
        answers: [...(answers?.answers || []), response],
      })
    );
  };

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
            {question?.typeOptions?.map((option, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={answers?.answers?.includes(option.label)}
                      onChange={handleChange}
                      name={option.label}
                    />
                  }
                  label={option.label}
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
