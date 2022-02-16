import React, { useContext, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import { DateContext, CovidContext } from './contexts/context';
import axios from 'axios';

const DatePick = () => {
  const {dateValue, setDateValue} = useContext(DateContext);

  const selectedDate = dateValue.toLocaleDateString('en-GB').split('/').reverse().join('');
  console.log(selectedDate);
  useEffect( () => {
    const getData = async () => {
      const res = await axios.get("http://localhost:8000/covid?date=" + selectedDate);
    };
    getData();
  }, [dateValue]);

  return (
      <div>
        <DatePicker calenderClassName={"react-calendar"} onChange={setDateValue} value={dateValue} />
      </div>
  );
}

export default DatePick;