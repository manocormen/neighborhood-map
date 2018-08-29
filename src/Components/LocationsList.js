import React, { Component } from 'react'

class LocationsList extends Component {

  render = () => (
    <aside className='LocationsList'>
      <ul aria-label='List of locations in London' className='LocationsList-list'>

        {this.props.locations.map((location, locationIndex) =>
          (location.display) ? (
            <li
              key={locationIndex}
              className={'LocationsList-item'}
              tabIndex={0}
              onMouseEnter={() => this.props.handleHover(locationIndex)}
              onMouseLeave={() => this.props.handleHover(locationIndex)}
              onFocus={() => this.props.handleClick(locationIndex)}
              onBlur={() => this.props.handleClick(locationIndex)}>
              {location.name}
            </li>
          ) : null
        )}

      </ul>
    </aside>
  )
}

export default LocationsList
