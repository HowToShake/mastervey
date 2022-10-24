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

const DatePickerAnswer: FC<Partial<AnswerProps>> = ({ question, answers }) => {
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
          {/*  @ts-ignore */}
          <DesktopDatePicker
            inputFormat="dd.MM.yyyy"
            value={answers[0] ? new Date(answers[0]) : new Date()}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default DatePickerAnswer;
