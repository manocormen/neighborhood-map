import React, { Component } from 'react'

class LocationsList extends Component {
  render() {
    return (
      <div className='LocationsList'>
        <h1 className='sidebar-heading'>Locations</h1>

        {this.props.locations.map((location, index) =>
          (location.display) ? (
            <div
              key={index}
              className='LocationsList-item'>
              {location.name}
            </div>
          ) : null
        )}

      </div>
    )
  }
}

export default LocationsList
