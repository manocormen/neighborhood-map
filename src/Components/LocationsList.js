import React, { Component } from 'react';

class LocationsList extends Component {
  render() {
    return (
      <div className='LocationsList'>

        {this.props.locations.map(location => (
          <div className='LocationList-item'>
            {location.name}
          </div>
        ))}
        
      </div>
    );
  }
}

export default LocationsList;
