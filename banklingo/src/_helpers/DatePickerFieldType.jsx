import React from 'react';
import './DatePickerFieldType.scss';


const DatePickerFieldType = React.forwardRef(
  ({ value, onClick, placeHolder }, ref) => (
    <button className='date-picker' onClick={(e)=>{
        onClick();
        e.preventDefault(); //prevent postback
     

    }} ref={ref}>
      <span className='text'>{value ? value : placeHolder}</span>
      <span className='icon'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.9999 2.66667H3.99992C2.52716 2.66667 1.33325 3.86058 1.33325 5.33334V12C1.33325 13.4728 2.52716 14.6667 3.99992 14.6667H11.9999C13.4727 14.6667 14.6666 13.4728 14.6666 12V5.33334C14.6666 3.86058 13.4727 2.66667 11.9999 2.66667Z'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.33325 1.33334V4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10.6665 1.33334V4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M1.33325 6.66667H14.6666'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </span>
    </button>
  )
);

export default DatePickerFieldType;
