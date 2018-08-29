import React, { Component } from 'react'

class LocationsFilter extends Component {

  // Move focus to drop-down filter menu on page load
  componentDidMount = () => this.refs.filters.focus()

  render = () => (
    <aside className='LocationsFilter'>
      <h1 className='sidebar-heading'>Filter:</h1>
      <select
        aria-label='Filter by location type'
        ref='filters'
        value={this.props.filter}
        onChange={event => this.props.onFilterChange(event.target.value)}>
        <option value='showAll'>Show All</option>
        <option value='museum'>Museums</option>
        <option value='park'>Parks</option>
        <option value='building'>Buildings</option>
        <option value='market'>Markets</option>
        <option value='bridge'>Bridges</option>
      </select>
    </aside>
  )
}

export default LocationsFilter
