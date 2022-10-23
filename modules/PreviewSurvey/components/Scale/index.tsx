import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { FC } from "react";
import { AnswerProps } from "@pages/dashboard/[id]/preview";

const Scale: FC<AnswerProps> = ({ question, answers, index, update }) => {
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
          {question?.options?.[0]?.text && (
            <Typography mr={2}>{question?.options?.[0]?.text}</Typography>
          )}
          <Rating
            name="highlight-selected-only"
            // @ts-ignore
            defaultValue={answers?.answers?.[0]?.value}
            max={10}
            onChange={(e) => {
              update(index, {
                id: question.id,
                //@ts-ignore
                answers: [e.target.value],
              });
            }}
            icon={<CircleIcon fontSize="inherit" />}
            emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          />
          {question?.options?.[1]?.text && (
            <Typography ml={2}>{question?.options?.[1]?.text}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Scale;
