import React from 'react';
import {Field} from 'react-final-form';

export default ({name, placeholder, label, type = 'text'}) => (
  <Field name={name}>
    {({input, meta}) => (
      <div>
        <label>{label}</label>
        <input placeholder={placeholder} type={type} {...input} />
        {meta.touched && meta.error && <span>{meta.error}</span>}
      </div>
    )}
  </Field>
);
