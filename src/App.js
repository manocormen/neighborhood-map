import React, { Component } from 'react'
import LocationsFilter from './Components/LocationsFilter'
import LocationsList from './Components/LocationsList'
import CityMap from './Components/CityMap'
import './App.css';

class App extends Component {

  state = {
    filter: 'showAll',
    locations: [
      {
        name: 'National Gallery',
        type: 'museum',
        latlng: (51.508929,-0.128299),
        display: true
      },
      {
        name: 'St James\'s Park',
        type: 'park',
        latlng: (51.50246,-0.134811),
        display: true
      },
      {
        name: 'Palace of Westminster',
        type: 'building',
        latlng: (51.499479,-0.124809),
        display: true
      },
      {
        name: 'Borough Market',
        type: 'market',
        latlng: (51.50544,-0.091061),
        display: true
      },
      {
        name: 'Tower Bridge',
        type: 'bridge',
        latlng: (51.505417,-0.07539),
        display: true
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

  render = () => (
    <div className='App'>
      <LocationsFilter
        filter={this.state.filter}
        onFilterChange={this.changeFilter}/>
      <LocationsList locations={this.state.locations}/>
      <CityMap/>
    </div>
  )
}

export default App
