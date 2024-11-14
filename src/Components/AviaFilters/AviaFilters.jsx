import './AviaFilters.scss'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkboxChanged } from '../../store/aviaFiltersSlice'
import { filterTickets } from '../../store/TicketsSlice'

function AviaFilters() {
  const dispatch = useDispatch()
  const filtersArray = useSelector((state) => state.aviaFilters.aviaFilters)
  const activeFilters = useSelector((state) => state.aviaFilters.activeAviaFilter)
  const status = useSelector((state) => state.Tickets.status)
  const allTickets = useSelector((state) => state.Tickets.allTickets)
  const checkboxLabelOnclick = (e) => {
    if (e.target.className === 'avia-filters__checkbox-label') {
      e.target.className = 'avia-filters__checkbox-label--checked'
    } else {
      e.target.className = 'avia-filters__checkbox-label'
    }
  }
  const checkboxOnchange = (e) => {
    dispatch(checkboxChanged({ filterId: e.target.id }))
  }
  useEffect(() => {
    dispatch(filterTickets({ filters: activeFilters }))
  }, [activeFilters, dispatch, status, allTickets])
  const aviaFilters = filtersArray.map((filter) => (
    <li className="avia-filters__filter" key={filter.id}>
      <label
        className={filter.isActive ? 'avia-filters__checkbox-label--checked' : 'avia-filters__checkbox-label'}
        htmlFor={filter.id}
        onClick={checkboxLabelOnclick}
      />
      <input
        type="checkbox"
        id={filter.id}
        className="avia-filters__checkbox"
        checked={filter.isActive}
        onChange={checkboxOnchange}
      />
      <span className="avia-filters__text">{filter.text}</span>
    </li>
  ))
  return (
    <div className="avia-filters">
      <h3 className="avia-filters__title">КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
      <ul className="avia-filters__filters-list">{aviaFilters}</ul>
    </div>
  )
}

export default AviaFilters
