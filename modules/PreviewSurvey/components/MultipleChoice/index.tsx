import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import * as React from "react";

const MultipleChoice = ({ question, typeOptions }) => {
  const [state, setState] = React.useState([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = event.target.name;

    if (state?.includes(response)) {
      const newState = state?.filter((value) => value !== response);

      return setState(newState);
    }

    return setState([...state, response]);
  };

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
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            {typeOptions?.map((option) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state?.includes(option.label)}
                      onChange={handleChange}
                      name={option.label}
                    />
                  }
                  label={option.label}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default MultipleChoice;
