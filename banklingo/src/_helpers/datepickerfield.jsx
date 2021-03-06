import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import './datepickerfield.scss';
import DatePickerFieldType from './DatePickerFieldType';

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  return (
    <DatePicker
      className='picker'
      {...field}
      {...props}
      autoComplete='off'
      onChangeRaw={handleDateChangeRaw}
      dateFormat={window.dateformat}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        val.setHours(val.getHours() + 1);
        setFieldValue(field.name, val);
      }}
      customInput={<DatePickerFieldType />}
    />
  );
};

export default DatePickerField;
