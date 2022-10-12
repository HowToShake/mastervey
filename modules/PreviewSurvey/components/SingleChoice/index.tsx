import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateAnswer } from "@slices/createSurvey";

const SingleChoice = ({ question }) => {
  const answers = useAppSelector((state) =>
    state.createSurvey.answers.answers.find(
      (que) => que.questionId === question?.id
    )
  );

  const dispatch = useAppDispatch();

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
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {question?.typeOptions?.map((option) => {
              return (
                <FormControlLabel
                  value={answers?.answers?.[0]}
                  control={<Radio value={option.label} />}
                  label={option.label}
                  onChange={(e) => {
                    dispatch(
                      updateAnswer({
                        //@ts-ignore
                        id: question.id,
                        answers: [option.label],
                      })
                    );
                  }}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SingleChoice;
