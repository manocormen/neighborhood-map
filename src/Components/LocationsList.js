import React, { Component } from 'react'

class LocationsList extends Component {

  render = () => (
    <div className='LocationsList'>
      <h1 className='sidebar-heading'>Locations</h1>

      {this.props.locations.map((location, locationIndex) =>
        (location.display) ? (
          <div
            key={locationIndex}
            className={ (location.highlight) ? 'LocationsList-item-highlight' : 'LocationsList-item'}
            onMouseEnter={() => this.props.handleHover(locationIndex)}
            onMouseLeave={() => this.props.handleHover(locationIndex)}>
            {location.name}
          </div>
        ) : null
      )}

    </div>
  )
}

export default LocationsList
