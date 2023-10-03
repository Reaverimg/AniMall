import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField(props) {
  
  const { name, form, label, disable } = props;

  const { errors } = form;

  const hasError = errors[name];

  // console.log(errors[name], formState[name]);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          name={name}
          label={label}
          value={value}
          disable={disable}
          error={!!hasError}
          helperText={errors[name]?.message}
          onChange={onChange}
          onBlur={onBlur}
          margin="normal"
          variant="outlined"
          fullWidth
        ></TextField>
      )}
    ></Controller>
  );
}

export default InputField;
