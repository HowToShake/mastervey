import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateAnswer } from "@slices/createSurvey";
import { FC } from "react";
import { AnswerProps } from "@pages/dashboard/[id]/preview";

const ShortText: FC<AnswerProps> = ({ question, update, index, answers }) => {
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
          // required={question?.required}
          value={[answers]}
          onChange={(e) => {
            update(index, {
              id: question.id,
              answers: [e.target.value],
            });
          }}
          placeholder="Answer"
          inputProps={{ maxLength: 50 }}
        />
      </CardContent>
    </Card>
  );
};

export default ShortText;
