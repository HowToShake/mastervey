import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateAnswer } from "@slices/createSurvey";

const Scale = ({ question }) => {
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
        <Box
          sx={{ alignItems: "center", display: "flex", flexDirection: "row" }}
        >
          {question?.typeOptions?.[0]?.label && (
            <Typography mr={2}>{question?.typeOptions?.[0]?.label}</Typography>
          )}
          <Rating
            name="highlight-selected-only"
            // @ts-ignore
            defaultValue={answers?.answers?.[0]?.value}
            max={10}
            onChange={(e) => {
              dispatch(
                updateAnswer({
                  //@ts-ignore
                  id: question.id,
                  //@ts-ignore
                  answers: [e.target.value],
                })
              );
            }}
            icon={<CircleIcon fontSize="inherit" />}
            emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          />
          {question?.typeOptions?.[1]?.label && (
            <Typography ml={2}>{question?.typeOptions?.[1]?.label}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Scale;
