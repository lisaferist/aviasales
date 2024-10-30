import './FilterTabs.scss'

import React from 'react'

function FilterTabs() {
  return (
    <div className="filter-tabs">
      <button className="filter-tabs__tab filter-tabs__tab--active">САМЫЙ ДЕШЕВЫЙ</button>
      <button className="filter-tabs__tab">САМЫЙ БЫСТРЫЙ</button>
    </div>
  )
}

export default FilterTabs
