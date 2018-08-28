import React, { Component } from 'react'
import LocationsFilter from './Components/LocationsFilter'
import LocationsList from './Components/LocationsList'
import CityMap from './Components/CityMap'
import './App.css';

class App extends Component {

  state = {
    map: null,
    filter: 'showAll',
    locations: [
      {
        name: 'National Gallery',
        type: 'museum',
        latlng: {lat: 51.508929, lng: -0.128299},
        display: true,
        marker: null
      },
      {
        name: 'St James\'s Park',
        type: 'park',
        latlng: {lat: 51.50246, lng: -0.134811},
        display: true,
        marker: null
      },
      {
        name: 'Palace of Westminster',
        type: 'building',
        latlng: {lat: 51.499479, lng: -0.124809},
        display: true,
        marker: null
      },
      {
        name: 'Borough Market',
        type: 'market',
        latlng: {lat: 51.50544, lng: -0.091061},
        display: true,
        marker: null
      },
      {
        name: 'Tower Bridge',
        type: 'bridge',
        latlng: {lat: 51.505456, lng: -0.075356},
        display: true,
        marker: null
      }
    ]
  }

  changeFilter = newFilter => {
    const newLocations = this.state.locations.map(location => {
      location.display = (newFilter === 'showAll' || location.type === newFilter) ? true : false
      return location
    })

    this.setState({
      filter: newFilter,
      locations: newLocations
    })
  }

  setMap = newMap => this.setState({ map: newMap })

  setMarker = (newMarker, locationIndex) => {
    const newLocations = this.state.locations.map((location, index) => {
      if (locationIndex === index) {location.marker = newMarker}
      return location
    })

    this.setState({ locations: newLocations })
  }

  render = () => (
    <div className='App'>
      <LocationsFilter
        filter={this.state.filter}
        onFilterChange={this.changeFilter}/>
      <LocationsList locations={this.state.locations}/>
      <CityMap
        map={this.state.map}
        locations={this.state.locations}
        onMapSet={this.setMap}
        onMarkerSet={this.setMarker}/>
    </div>
  )
}

export default App
