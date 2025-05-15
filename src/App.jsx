import { useState } from "react"; 
import './App.css'


function App() {

  const [ferryAttributes, setFerryAttributes] = useState({});

  const fetchFerryData = async () => {
    const apiUrl = `https://api.at.govt.nz/realtime/legacy/ferrypositions`
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': import.meta.env.VITE_AT_SUBSCRIPTION_PRIMARY_KEY
      }
    });
    
    const tripResponse = await response.json();
    
    setFerryAttributes(tripResponse)
  }

  return (
    <div className="app">
      <h1>Ferry Info</h1>
        <button onClick={fetchFerryData} style={{ marginBottom: "30px" }}>Get Ferry Info</button>
        <ul>
          {ferryAttributes.response && ferryAttributes.response.map((details, index) => (
            <li key={index}
            style={{ marginBottom: "38px" }}>
              <p><b>Vessel Name: </b>{details.vessel}</p>
              <p><b>Call Sign: </b>{details.callsign}</p>
              <p><b>Operator Name: </b>{details.operator}</p>
              <p><b>Longitude: </b>{details.lng}</p>
              <p><b>Latitude: </b>{details.lat}</p>
            </li>
          ))}
        </ul>
    </div>
  );
}


export default App;
