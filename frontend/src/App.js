import React, { useEffect, useMemo, useState } from 'react';
import PlotJapan from './PlotJapan';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import {BallTriangle} from 'react-loader-spinner'
import { forceCenter } from 'd3';

const App = () => {
  const [dateValue, setDateValue] = useState(new Date());
  const [covidNum, setCovidNum] = useState([]);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getDiff = () => {
      const selectedDate = dateValue.toLocaleDateString('en-GB').split('/').reverse().join('-');
      console.log(covidNum);
      covidNum.map((covidData, index) => {
        console.log(covidData[0]);
        if(covidData[0].date===selectedDate ) {
          console.log(covidData);
          const today = covidData;
          const yesterday = covidNum[index+1];
          console.log(today, yesterday);
          today.map((e, j) => {
            e.npatients = String(parseInt(e.npatients) - parseInt(yesterday[j].npatients));
          });
          console.log(today);
          setResult(today);
        }
      });
      console.log(result);
    };
    if (covidNum.length > 0) getDiff();
    }, [dateValue]);

  
  useEffect(() => {
    const getDateAPI = async () => {
      const res = await axios.get("http://localhost:8000/covid");
      setLoaded(true);
      const chunkSize = 47;
      const arr = res.data.itemList;
      const groups = arr.map((e, i) => { 
          return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null; 
      }).filter(e => { return e; });
      console.log(groups);
      setCovidNum(groups);
    }
    if(covidNum.length === 0) getDateAPI();
  }, []);

  //await DatePick();
  return (
    < >
        {loaded ? (
          <div>
            <DatePicker calenderClassName={"react-calendar"} onChange={setDateValue}  value={dateValue} />
            <div className="App">
              <header className="App-header">
                <PlotJapan covidNum={result}/>
              </header>
            </div>
          </div>
        ) : (
          <div
          style={{display: "flex", justifyContent: "center", alignItems: "center",}}
          
          >
            
            <BallTriangle
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
        />
            <h1>Loading...</h1>
            </div>
          
        )
        }
      
        
    </>

      
  );
}

export default App;