import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Input, Stack, TextField, Typography } from "@mui/material";
import {
  Control,
  FieldValues,
  useFieldArray,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShortTextIcon from "@mui/icons-material/ShortText";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

export enum QuestionTypes {
  SINGLECHOICE = "SINGLECHOICE",
  MULTIPLECHOICE = "MULTIPLECHOICE",
  SHORTTEXT = "SHORTTEXT",
  LONGTEXT = "LONGTEXT",
  SCALE = "SCALE",
  DATE = "DATE",
  TIME = "TIME",
}

const availableTypes = [
  { type: QuestionTypes.SINGLECHOICE, icon: PanoramaFishEyeIcon },
  { type: QuestionTypes.MULTIPLECHOICE, icon: CheckBoxIcon },
  { type: QuestionTypes.SHORTTEXT, icon: ShortTextIcon },
  { type: QuestionTypes.LONGTEXT, icon: FormatAlignJustifyIcon },
  { type: QuestionTypes.SCALE, icon: LinearScaleIcon },
  { type: QuestionTypes.DATE, icon: EventIcon },
  { type: QuestionTypes.TIME, icon: AccessTimeIcon },
];

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  options?: Option[];
  type: QuestionTypes;
}

interface CreateQuestionCardNewType {
  control: Control;
  index: number;
  update: UseFieldArrayUpdate<FieldValues, "dynamic">;
  remove: UseFieldArrayRemove;
  question: Question;
}

const QuestionNavbar = {
  [QuestionTypes.SINGLECHOICE]: "Prepare options for users",
  [QuestionTypes.MULTIPLECHOICE]: "Prepare multiple options for users",
};

const CreateQuestionCardNew: React.FC<CreateQuestionCardNewType> = ({
  remove,
  control,
  index,
  update,
  question,
}) => {
  const {
    fields,
    append,
    update: updateOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `dynamic.${index}.options`,
  });

  const visibleDynamicOptions =
    question.type === QuestionTypes.SINGLECHOICE ||
    question.type === QuestionTypes.MULTIPLECHOICE;

  return (
    <Card elevation={1}>
      <CardContent>
        <Grid container rowGap={2}>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <IconButton
              color="error"
              onClick={() => {
                remove(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Question"
                fullWidth
                value={question.question}
                onChange={(e) => {
                  update(index, { ...question, question: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="Select-question-type">Question type</InputLabel>
                <Select
                  id="demo-simple-select"
                  value={question.type}
                  label="Question type"
                  placeholder="Select question type"
                  onChange={(e) => {
                    update(index, {
                      ...question,
                      type: QuestionTypes[e.target.value],
                    });
                  }}
                >
                  {availableTypes?.map(({ type, icon: Icon }) => (
                    <MenuItem value={type}>
                      <Button startIcon={<Icon />}>{type}</Button>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {visibleDynamicOptions && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5">
                  {QuestionNavbar[question.type] || ""}
                </Typography>
              </Grid>

              <Grid container rowGap={4}>
                <Stack sx={{ width: "50%" }}>
                  {fields?.map(
                    (option: { id: string; text: string }, index) => {
                      return (
                        <Stack direction="row">
                          <Input
                            fullWidth
                            value={option.text}
                            onChange={(e) => {
                              updateOption(index, {
                                ...option,
                                text: e.target.value,
                              });
                            }}
                          />
                          <IconButton
                            color="error"
                            onClick={() => {
                              removeOption(index);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      );
                    }
                  )}
                </Stack>

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => append({ text: "" })}
                  >
                    Add option
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreateQuestionCardNew;
