import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";
import { FC } from "react";
import { AnswerProps } from "@pages/dashboard/[id]/preview";

const ShortTextAnswer: FC<Partial<AnswerProps>> = ({ question, answers }) => {
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
          value={[answers]}
          placeholder="Answer"
          inputProps={{ maxLength: 50 }}
        />
      </CardContent>
    </Card>
  );
};

export default ShortTextAnswer;
