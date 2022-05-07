import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, FormControlLabel, Switch, TextField } from "@mui/material";
import TypeField from "../TypeField";

import TypeOptions from "../TypeOptions";

const CreateQuestionCard = ({ id }) => {
  return (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField label="Question" sx={{ width: "45%" }} />
          <TypeField id={id} sx={{ width: "45%" }} />
        </Box>
        <Box mt={4}>
          <TypeOptions id={id} />
        </Box>
      </CardContent>
      <CardActions>
        <FormControlLabel
          control={<Switch defaultChecked={false} />}
          label="Required"
        />
      </CardActions>
    </Card>
  );
};

export default CreateQuestionCard;
