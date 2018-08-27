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

  initMap = () => new window.google.maps.Map(this.refs.map, {
    center: {lat: 51.502491, lng: -0.10031},
    zoom: 13
  })

  render = () => (
    <div className='CityMap'>
      <div ref='map' className='CityMap-map'></div>
    </div>
  )
}

export default CityMap
