import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextareaAutosize } from "@mui/material";
import Card from "@mui/material/Card";
import { FC } from "react";
import { AnswerProps } from "@pages/dashboard/[id]/preview";

const LongText: FC<AnswerProps> = ({ question, index, update, answers }) => {
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
          // required={question.required}
          placeholder="Long text"
          style={{ width: 600, maxWidth: 900 }}
          value={(answers?.[0] as string) || ""}
          onChange={(e) => {
            update(index, {
              questionId: question.id,
              answers: [e.target.value],
            });
          }}
        />
      </CardContent>
    </Card>
  );
};

export default LongText;
