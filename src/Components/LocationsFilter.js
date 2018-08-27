import React, { Component } from 'react'

class LocationsFilter extends Component {
  
  render = () => (
    <div className='LocationsFilter'>
      <h1 className='sidebar-heading'>Filter</h1>
      <select
        value={this.props.filter}
        onChange={event => this.props.onFilterChange(event.target.value)}>
        <option value='showAll'>Show All</option>
        <option value='museum'>Museums</option>
        <option value='park'>Parks</option>
        <option value='building'>Buildings</option>
        <option value='market'>Markets</option>
        <option value='bridge'>Bridges</option>
      </select>
    </div>
  )
}

export default LocationsFilter
