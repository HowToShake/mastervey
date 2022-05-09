import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const AnswerCard = ({ answerId, answerValue }) => {
  const question = useAppSelector((state) =>
    state.createSurvey.createSurvey.find((que) => que.id === answerId)
  );

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
        <Typography>{JSON.stringify(answerValue)}</Typography>
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
