import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateAnswer } from "@slices/createSurvey";

const ShortText = ({ question }) => {
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
        <TextField
          sx={{ width: 600 }}
          required={question?.required}
          value={answers?.answers?.[0] || ""}
          onChange={(e) => {
            dispatch(
              updateAnswer({
                //@ts-ignore
                id: question.id,
                answers: [e.target.value],
              })
            );
          }}
          placeholder="Answer"
          inputProps={{ maxLength: 50 }}
        />
      </CardContent>
    </Card>
  );
};

export default ShortText;
