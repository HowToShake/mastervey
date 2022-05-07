import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShortTextIcon from "@mui/icons-material/ShortText";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeQuestionState } from "../../../../slices/CreateSurvey";

const availableTypes = [
  { type: "singleChoice", icon: PanoramaFishEyeIcon },
  { type: "multipleChoice", icon: CheckBoxIcon },
  { type: "shortText", icon: ShortTextIcon },
  { type: "longText", icon: FormatAlignJustifyIcon },
  { type: "scale", icon: LinearScaleIcon },
  { type: "date", icon: EventIcon },
  { type: "time", icon: AccessTimeIcon },
];

const TypeField = ({ sx, id }) => {
  const { type } = useAppSelector((state) =>
    state.createSurvey?.createSurvey?.find((survey) => survey.id === id)
  );

  const dispatch = useAppDispatch();

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        size="small"
        id="demo-simple-select"
        value={type}
        label="Age"
        placeholder="Select form"
        onChange={(e) => {
          console.log("e", e.target.value);
          dispatch(
            changeQuestionState(
              // @ts-ignore
              { key: "type", value: e.target.value, questionId: id }
            )
          );
        }}
      >
        {availableTypes?.map(({ type, icon: Icon }) => (
          <MenuItem value={type} divider>
            <Button startIcon={<Icon />}>{type}</Button>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeField;
