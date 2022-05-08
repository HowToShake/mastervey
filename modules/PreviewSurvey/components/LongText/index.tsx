import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextareaAutosize, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import * as React from "react";

const LongText = ({ question, required }) => {
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
          <Typography variant="h4">{question}</Typography>
        </Box>
        <TextareaAutosize placeholder="Long text" style={{ width: 600 }} />
      </CardContent>
    </Card>
  );
};

export default LongText;
