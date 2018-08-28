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
        highlight: false,
        marker: null,
        infoWindow: null
      },
      {
        name: 'St James\'s Park',
        type: 'park',
        latlng: {lat: 51.50246, lng: -0.134811},
        display: true,
        highlight: false,
        marker: null,
        infoWindow: null
      },
      {
        name: 'Palace of Westminster',
        type: 'building',
        latlng: {lat: 51.499479, lng: -0.124809},
        display: true,
        highlight: false,
        marker: null,
        infoWindow: null
      },
      {
        name: 'Borough Market',
        type: 'market',
        latlng: {lat: 51.50544, lng: -0.091061},
        display: true,
        highlight: false,
        marker: null,
        infoWindow: null
      },
      {
        name: 'Tower Bridge',
        type: 'bridge',
        latlng: {lat: 51.505456, lng: -0.075356},
        display: true,
        highlight: false,
        marker: null,
        infoWindow: null
      }
    ]
  }

  setMap = newMap => this.setState({ map: newMap })

  changeFilter = newFilter => {
    const newLocations = this.state.locations.map((location, locationIndex) => {
      location.display = (newFilter === 'showAll' || location.type === newFilter) ? true : false
      this.toggleMarker(locationIndex)
      this.closeFilteredInfoWindows(locationIndex)
      return location
    })

    this.setState({
      filter: newFilter,
      locations: newLocations
    })
  }

  setMarker = (newMarker, locationIndex) => {
    const newLocations = this.state.locations.map((location, index) => {
      if (locationIndex === index) { location.marker = newMarker }
      return location
    })

    this.setState({ locations: newLocations })
  }

  setInfoWindow = (newInfoWindow, locationIndex) => {
    const newLocations = this.state.locations.map((location, index) => {
      if (locationIndex === index) { location.infoWindow = newInfoWindow }
      return location
    })

    this.setState({ locations: newLocations })
  }

  toggleMarker = locationIndex => {
    const newLocations = this.state.locations.map((location, index) => {
      if (index === locationIndex) { location.marker.setVisible(location.display) }
      return location
    })

    this.setState({ locations: newLocations })
  }

  toggleHighlight = locationIndex => {
    const newLocations = this.state.locations.map((location, index) => {
      if (index === locationIndex) {
        location.highlight = (location.highlight) ? false : true
        location.marker.setIcon(
          (location.marker.icon === 'http://maps.google.com/mapfiles/ms/icons/red.png') ?
          'http://maps.google.com/mapfiles/ms/icons/blue.png' :
          'http://maps.google.com/mapfiles/ms/icons/red.png'
        )
      }
      return location
    })

    this.setState({ locations: newLocations })
  }

  toggleInfoWindow = locationIndex => {
    const newLocations = this.state.locations.map((location, index) => {
      if (index === locationIndex) {
        if (!location.infoWindow.visible) {
          this.closeAllInfoWindows()
          location.infoWindow.open(this.state.map, location.marker)
          location.infoWindow.visible = true
        } else {
          location.infoWindow.close()
          location.infoWindow.visible = false
        }
      }
      return location
    })

    this.setState({ locations: newLocations })
  }

  closeAllInfoWindows = () => {
    const newLocations = this.state.locations.map(location => {
      if (location.infoWindow.visible) {
        location.infoWindow.close()
        location.infoWindow.visible = false
      }
      return location
    })

    this.setState({ locations: newLocations })
  }

  closeFilteredInfoWindows = locationIndex => {
    const newLocations = this.state.locations.map(location => {
      if (!location.marker.visible) {
        location.infoWindow.close()
        location.infoWindow.visible = false
      }
      return location
    })

    this.setState({ locations: newLocations })
  }

  render = () => (
    <div className='App'>
      <LocationsFilter
        filter={this.state.filter}
        onFilterChange={this.changeFilter}/>
      <LocationsList
        locations={this.state.locations}
        handleHover={this.toggleHighlight}
        handleClick={this.toggleInfoWindow}/>
      <CityMap
        map={this.state.map}
        locations={this.state.locations}
        onMapSet={this.setMap}
        onMarkerSet={this.setMarker}
        onInfoWindowSet={this.setInfoWindow}
        handleHover={this.toggleHighlight}
        handleClick={this.toggleInfoWindow}/>
    </div>
  )
}

export default App
