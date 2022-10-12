import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateAnswer } from "@slices/createSurvey";

const LongText = ({ question }) => {
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
          <Typography variant="h4">{question.question}</Typography>
        </Box>
        <TextareaAutosize
          required={question.required}
          placeholder="Long text"
          style={{ width: 600 }}
          value={(answers?.answers?.[0] as string) || ""}
          onChange={(e) => {
            dispatch(
              updateAnswer({
                //@ts-ignore
                id: question.id,
                answers: [e.target.value],
              })
            );
          }}
        />
      </CardContent>
    </Card>
  );
};

export default LongText;
