import React, { Component } from 'react'

class CityMap extends Component {

  componentDidMount = () => {
    window.initMap = this.initMap
    this.loadMapsAPI()
  }

  loadMapsAPI = () => {
    const loadMapsAPIScript = document.createElement('script')
    loadMapsAPIScript.async = true
    loadMapsAPIScript.defer = true
    loadMapsAPIScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCKOrRrF3ns0-jL1xgBPMVXVnqE-wzrfLw&callback=initMap'
    document.body.appendChild(loadMapsAPIScript)
  }

  createMap = () => {
    const newMap = new window.google.maps.Map(this.refs.map, {
      center: {lat: 51.502491, lng: -0.10031},
      zoom: 13,
      mapTypeControl: false
    })

    this.props.onMapSet(newMap)
  }

  createMarker = locationIndex => {
    const newMarker = new window.google.maps.Marker({
      map: this.props.map,
      position: this.props.locations[locationIndex].latlng,
      title: this.props.locations[locationIndex].name,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red.png'
    })

    newMarker.addListener('mouseover', () => this.props.handleHover(locationIndex))
    newMarker.addListener('mouseout', () => this.props.handleHover(locationIndex))

    this.props.onMarkerSet(newMarker, locationIndex)
  }

  createInfoWindow = locationIndex => {

    let query = this.props.unsplash.endPoint
    query += this.props.locations[locationIndex].photoId
    query += `?client_id=${this.props.unsplash.client_id}`

    fetch(query)
    .then(response => response.json())
    .then(newPhotoData => {
      this.props.onPhotoDataSet(newPhotoData, locationIndex)
      return newPhotoData.urls.thumb
    })
    .then(thumbnail => {
      const newInfoWindow = new window.google.maps.InfoWindow({
        content:
          `<div>${this.props.locations[locationIndex].name}</div>
           <img src=${thumbnail}/>`,
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

  initMap = () => {
    this.createMap()

    // I only needed the locationIndex, but for...in didn't work here
    this.props.locations.forEach((_location, locationIndex) => {
      this.createMarker(locationIndex)
      this.createInfoWindow(locationIndex)
    })
  }

  render = () => (
    <div className='CityMap'>
      <div ref='map' className='CityMap-map'></div>
    </div>
  )
}

export default CityMap
