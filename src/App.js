import React, { Component } from 'react';
import LocationsFilter from './Components/LocationsFilter';
import LocationsList from './Components/LocationsList';
import CityMap from './Components/CityMap';
import './App.css';

class App extends Component {

  state = {
    locations: [
      {
        name: 'National Gallery',
        type: 'Museum',
        latlng: (51.508929,-0.128299)
      },
      {
        name: 'St James\'s Park',
        type: 'Park',
        latlng: (51.50246,-0.134811)
      },
      {
        name: 'Palace of Westminster',
        type: 'Building',
        latlng: (51.499479,-0.124809)
      },
      {
        name: 'Borough Market',
        type: 'Market',
        latlng: (51.50544,-0.091061)
      },
      {
        name: 'Tower Bridge',
        type: 'Bridge',
        latlng: (51.505417,-0.07539)
      }
    ]
  }

  render() {
    return (
      <div className='App'>
        <LocationsFilter/>
        <LocationsList/>
        <CityMap/>
      </div>
    );
  }
}

export default App;
