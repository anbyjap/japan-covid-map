import React, { useEffect, useMemo, useState } from 'react';
import PlotJapan from './PlotJapan';
import { DateContext, CovidContext } from './contexts/context';
import DatePicker from 'react-date-picker';
import axios from 'axios';

const App = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [covidNum, setCovidNum] = useState([]);
  
  const value = useMemo(
      () => ({dateValue, setDateValue}),
      [dateValue]
  );

  const value2 = useMemo(
    () => ({covidNum, setCovidNum}),
    [covidNum]
);

  const selectedDate = dateValue.toLocaleDateString('en-GB').split('/').reverse().join('');
  //console.log(selectedDate);
  useEffect(async () => {
    const res = await axios.get("http://localhost:8000/covid?date=" + selectedDate);
    setCovidNum(res.data.itemList);
  }, [dateValue]);

  //await DatePick();
  return (
    <>
      <div>
        <DatePicker calenderClassName={"react-calendar"} onChange={setDateValue}  value={dateValue} />
        </div>
        <div className="App">
          <header className="App-header">
        <CovidContext.Provider value={value2}>
              <PlotJapan />
            </CovidContext.Provider>
          </header>
        </div>
        
    </>

      
  );
}

export default App;