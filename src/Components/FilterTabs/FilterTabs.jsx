import './FilterTabs.scss'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filterTabsChanged } from '../../store/aviaFiltersSlice'
import { fetchTickets } from '../../store/TicketsSlice'

function FilterTabs() {
  const dispatch = useDispatch()
  const activeTabId = useSelector((state) => state.aviaFilters.activeFiltersTab)
  const filterTabOnclick = (e) => {
    dispatch(fetchTickets())
    dispatch(filterTabsChanged({ tabId: e.target.id }))
  }
  return (
    <div className="filter-tabs">
      <button
        className={activeTabId === 'cheap' ? 'filter-tabs__tab filter-tabs__tab--active' : 'filter-tabs__tab'}
        id="cheap"
        onClick={filterTabOnclick}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        className={activeTabId === 'fast' ? 'filter-tabs__tab filter-tabs__tab--active' : 'filter-tabs__tab'}
        id="fast"
        onClick={filterTabOnclick}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
    </div>
  )
}

export default FilterTabs
