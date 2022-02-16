import React, { useMemo, useState } from 'react';
import PlotJapan from './PlotJapan';
import DatePick from './datePicker';
import { DateContext } from './contexts/context';


const App = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [covidNum, setCovidNum] = useState([]);
  
  const value = useMemo(
      () => ({dateValue, setDateValue}),
      [dateValue]
  );
  return (
    <>
      <DateContext.Provider value={value}>
        <DatePick style={{width:"100%"}}/>
        <div className="App">
          <header className="App-header">
            <PlotJapan />
          </header>
        </div>
      </DateContext.Provider>
    </>

      
  );
}

export default App;