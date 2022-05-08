import { Rating } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

const Scale = ({ question, typeOptions }) => {
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
        <Box
          sx={{ alignItems: "center", display: "flex", flexDirection: "row" }}
        >
          {typeOptions?.[0]?.label && (
            <Typography mr={2}>{typeOptions?.[0]?.label}</Typography>
          )}
          <Rating
            name="highlight-selected-only"
            defaultValue={2}
            max={10}
            icon={<CircleIcon fontSize="inherit" />}
            emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          />
          {typeOptions?.[1]?.label && (
            <Typography ml={2}>{typeOptions?.[1]?.label}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Scale;
