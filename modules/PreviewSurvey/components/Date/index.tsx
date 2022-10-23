import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { AnswerProps } from "@pages/dashboard/[id]/preview";
import { FC } from "react";

const DatePicker: FC<AnswerProps> = ({ question, update, index, answers }) => {
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat="dd.MM.yyyy"
            value={answers[0] ? new Date(answers[0]) : new Date()}
            onChange={(e) => {
              update(index, {
                id: question.id,
                // @ts-ignore
                answers: [new Date(e)],
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default DatePicker;
