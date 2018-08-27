import React, { Component } from 'react';
import LocationsFilter from './Components/LocationsFilter';
import LocationsList from './Components/LocationsList';
import CityMap from './Components/CityMap';
import './App.css';

class App extends Component {
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
