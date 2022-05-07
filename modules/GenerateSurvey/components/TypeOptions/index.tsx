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

const TypeOption = ({ id, label }) => {
  const questionId = id;
  const { typeOptions } = useAppSelector((state) =>
    state.createSurvey?.createSurvey?.find((survey) => survey.id === id)
  );

  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography mt={2} mb={2} variant="h6">
        {label}
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
};

const ScaleOption = ({ id: questionId }) => {
  const { typeOptions } = useAppSelector((state) =>
    state.createSurvey?.createSurvey?.find((survey) => survey.id === questionId)
  );
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography textAlign="center" variant="h4">
        Scale
      </Typography>
      <Typography textAlign="center">1 - 10</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 275,
        }}
      >
        {typeOptions?.map(({ id, label }, index) => {
          return (
            <Box sx={{ width: 275, mt: 2, mb: 2 }}>
              <Input
                sx={{ width: 275 }}
                id={id}
                placeholder={`Label for scale ${index === 0 ? "1" : "10"}`}
                value={label}
                onChange={(e) => {
                  console.log("e", e.target.value);
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

        {(!typeOptions || typeOptions?.length < 2) && (
          <Button
            sx={{ mt: 5, width: 275 }}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              dispatch(
                addTypeOption(
                  // @ts-ignore
                  { questionId }
                )
              )
            }
          >
            Add option
          </Button>
        )}
      </Box>
    </Box>
  );
};

const TypeOptions = ({ id }) => {
  const { type, typeOptions } = useAppSelector((state) =>
    state.createSurvey?.createSurvey?.find((survey) => survey.id === id)
  );

  const dispatch = useAppDispatch();

  if (type === "singleChoice") {
    return <TypeOption id={id} label="Prepare options for users" />;
  }

  if (type === "multipleChoice") {
    return <TypeOption id={id} label="Prepare multiple options for users" />;
  }

  if (type === "scale") {
    return <ScaleOption id={id} />;
  }

  return null;
};

export default TypeOptions;
