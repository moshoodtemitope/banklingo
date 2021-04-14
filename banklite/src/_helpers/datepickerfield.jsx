import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import './datepickerfield.scss';
import DatePickerFieldType from './DatePickerFieldType';

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      className='picker'
      {...field}
      {...props}
      autoComplete='off'
      dateFormat={window.dateformat}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      customInput={<DatePickerFieldType />}
    />
  );
};

export default DatePickerField;
