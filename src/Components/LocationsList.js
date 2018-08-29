import React, { Component } from 'react'

class LocationsList extends Component {

  render = () => (
    <aside className='LocationsList'>
      <h1 className='sidebar-heading'>Locations</h1>
        <ul aria-label='List of locations in London' className='LocationsList-list'>

          {this.props.locations.map((location, locationIndex) =>
            (location.display) ? (
              <li
                key={locationIndex}
                className={ (location.highlight) ? 'LocationsList-item-highlight' : 'LocationsList-item'}
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
