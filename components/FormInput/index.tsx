import { InputProps, TextField } from "@mui/material";
import React, { FC } from "react";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  FieldValues,
} from "react-hook-form";

type FormInputProps = {
  control: Control<FieldValues, object> | undefined;
  name: string;
  label?: string;
  errors: FieldErrorsImpl<{ [p: string]: any }>;
  InputProps?: InputProps;
  placeholder?: string;
  defaultValue?: string | number;
};

const FormInput: FC<FormInputProps> = ({
  control,
  name,
  label,
  errors,
  InputProps,
  placeholder,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          id={name}
          fullWidth
          label={label || name}
          margin="normal"
          type="text"
          variant="outlined"
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message as string}
          InputProps={InputProps}
          placeholder={placeholder || ""}
          {...field}
        />
      )}
    />
  );
};

export default FormInput;
