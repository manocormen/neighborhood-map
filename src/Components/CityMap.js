import React, { Component } from 'react'

class CityMap extends Component {

  state = {
    mapsError: false,
    unsplashError: false
  }

  // Handle Maps API loading error
  componentDidMount = () => {
    window.gm_authFailure = () => this.setState({ mapsError: true })
    window.initMap = this.initMap
    this.loadMapsAPI()
  }

  // Load Maps API
  loadMapsAPI = () => {
    const loadMapsAPIScript = document.createElement('script')
    loadMapsAPIScript.async = true
    loadMapsAPIScript.defer = true
    loadMapsAPIScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCKOrRrF3ns0-jL1xgBPMVXVnqE-wzrfLw&callback=initMap'
    document.body.appendChild(loadMapsAPIScript)
  }

  // Create map object and add it to state via prop
  createMap = () => {
    const newMap = new window.google.maps.Map(this.refs.map, {
      center: {lat: 51.502491, lng: -0.10031},
      zoom: 13,
      mapTypeControl: false
    })

    this.props.onMapSet(newMap)
  }

  // Create marker object and add it to state via prop
  createMarker = locationIndex => {
    const newMarker = new window.google.maps.Marker({
      map: this.props.map,
      position: this.props.locations[locationIndex].latlng,
      title: this.props.locations[locationIndex].name,
      icon: 'img/blue.png'
    })

    newMarker.addListener('mouseover', () => this.props.handleHover(locationIndex))
    newMarker.addListener('mouseout', () => this.props.handleHover(locationIndex))

    this.props.onMarkerSet(newMarker, locationIndex)
  }

  // Create info window object and add it to state via prop
  // All the photos are sourced from the Unsplash API
  // More info: https://unsplash.com/developers
  createInfoWindow = locationIndex => {

    // Build query to fetch photo from Unsplash API
    let query = this.props.unsplash.endPoint
    query += this.props.locations[locationIndex].photoId
    query += `?client_id=${this.props.unsplash.client_id}`

    // Attempt to fetch photo from Unsplash API, and handle error if required
    fetch(query)
    .then(response => response.json())
    .then(newPhotoData => {
      this.props.onPhotoDataSet(newPhotoData, locationIndex)
      return newPhotoData
    })
    .catch(error => this.setState({ unsplashError: true }))
    .then(newPhotoData => {
      let newInfoWindowContent = (this.state.unsplashError) ?
      `<h2>${this.props.locations[locationIndex].name}</h2>
        <h3>
          Error: Unsplash couldn't fetch photo
        </h3>
        <p aria-label='Notification of Unsplash error'>
          Check Console for more information.
        </p>` :
      `<h2>${this.props.locations[locationIndex].name}</h2>
    <img src=${newPhotoData.urls.thumb} alt="` + newPhotoData.description + `"}/>
        <p>Via the Unsplash API</p>`
      const newInfoWindow = new window.google.maps.InfoWindow({
        content: newInfoWindowContent,
        visible: false
      })
      return newInfoWindow
    })
    .then(newInfoWindow => {
      const marker = this.props.locations[locationIndex].marker

      marker.addListener('click', () => this.props.handleClick(locationIndex))
      newInfoWindow.addListener('closeclick', () => this.props.handleClick(locationIndex))

      this.props.onInfoWindowSet(newInfoWindow, locationIndex)
    })
  }

  // Initialize the map-building routine --- one map, several markers and info windows
  initMap = () => {
    this.createMap()

    // I only needed the locationIndex, but for...in didn't work here
    this.props.locations.forEach((_location, locationIndex) => {
      this.createMarker(locationIndex)
      this.createInfoWindow(locationIndex)
    })
  }

  render = () => (
    <section className='CityMap'>
      {(this.state.mapsError) ? (
        <p aria-label='Notification of Google Maps error'>
          Google Maps Error: An error occured while retrieving the map. Check the console for more information.
        </p>
      ) : (
        <div role='application' aria-label='Map of London' ref='map' className='CityMap-map'></div>
      )}
    </section>
  )
}

export default CityMap
