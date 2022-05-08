import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import plLocale from "date-fns/locale/pl";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { updateAnswer } from "../../../../slices/CreateSurvey";

const Time = ({ question }) => {
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
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
          <TimePicker
            inputFormat="HH:mm"
            value={answers?.answers?.[0] || null}
            onChange={(e) => {
              console.log("e", e);
              dispatch(
                updateAnswer({
                  //@ts-ignore
                  id: question.id,
                  answers: [e],
                })
              );
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default Time;
