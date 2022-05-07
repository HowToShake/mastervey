import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  addTypeOption,
  deleteTypeOption,
  updateTypeOption,
} from "../../../../slices/CreateSurvey";
import { IconButton, Input, InputAdornment } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TypeOption = () => {};

const TypeOptions = ({ id }) => {
  const questionId = id;
  const { type, typeOptions } = useAppSelector((state) =>
    state.createSurvey?.createSurvey?.find((survey) => survey.id === id)
  );

  const dispatch = useAppDispatch();

  if (type === "singleChoice") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography mt={2} mb={2} variant="h6">
          Prepare options for users
        </Typography>
        <FormControl>
          <RadioGroup name="radio-buttons-group">
            {typeOptions?.map(({ id, label }) => {
              return (
                <Box id={id}>
                  <FormControlLabel
                    value={label}
                    control={<Radio disabled />}
                    label={null}
                  />
                  <Input
                    id={id}
                    sx={{ width: 350 }}
                    value={label}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={(e) => {
                            dispatch(
                              deleteTypeOption({
                                //@ts-ignore
                                id,
                                questionId,
                              })
                            );
                          }}
                          edge="end"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => {
                      dispatch(
                        updateTypeOption({
                          //@ts-ignore
                          id,
                          label: e.target.value,
                          questionId,
                        })
                      );
                    }}
                  />
                </Box>
              );
            })}
          </RadioGroup>
        </FormControl>
        <Button
          sx={{ mt: 5, width: 275 }}
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() =>
            dispatch(
              addTypeOption(
                // @ts-ignore
                { questionId: id }
              )
            )
          }
        >
          Add option
        </Button>
      </Box>
    );
  }

  if (type === "multipleChoice") {
    return <h1>Multiple Choice</h1>;
  }

  if (type === "scale") {
    return <h1>Scale</h1>;
  }

  return null;
};

export default TypeOptions;
