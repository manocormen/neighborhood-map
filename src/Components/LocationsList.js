import React, { Component } from 'react';
import LocationItem from './LocationItem'

class LocationsList extends Component {
  render() {
    return (
      <div className='LocationsList'>
        <LocationItem/>
        <LocationItem/>
        <LocationItem/>
      </div>
    );
  }
}

export default LocationsList;
