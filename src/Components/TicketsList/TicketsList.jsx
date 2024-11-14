import './TicketsList.scss'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import Ticket from '../Ticket'
import { fetchTickets, sortTickets, setGettingInterval } from '../../store/TicketsSlice'
import ErrorBlock from '../ErrorBlock'

function TicketsList() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.Tickets.status)

  useEffect(() => {
    dispatch(
      setGettingInterval({
        interval: setInterval(() => {
          dispatch(fetchTickets())
        }, 1000),
      })
    )
  }, [dispatch])

  const numberOfTicketsDisplayed = useSelector((state) => state.Tickets.numberOfTicketsDisplayed)
  const activeFilters = useSelector((state) => state.aviaFilters.activeAviaFilter)
  const errorStatus = useSelector((state) => state.Tickets.error)
  const activeFilterTab = useSelector((state) => state.aviaFilters.activeFiltersTab)
  const ticketsArray = useSelector((state) => state.Tickets.displayedTickets)

  useEffect(() => {
    dispatch(sortTickets({ filterTab: activeFilterTab }))
  }, [activeFilterTab, ticketsArray])

  const tickets = ticketsArray
    .slice(0, numberOfTicketsDisplayed)
    .map((ticketObj) => <Ticket ticketObj={ticketObj} key={ticketObj.id} />)
  const spin =
    status === 'pending' || !status ? (
      <div className="tickets-list__spin-wrapper">
        {' '}
        <Spin size="large" />{' '}
      </div>
    ) : null
  const content = tickets || null
  const errorBlock = errorStatus ? <ErrorBlock /> : null

  if (activeFilters.length === 0) {
    return (
      <ul className="tickets-list">
        <div className="tickets-list__warning">
          Не найдено билетов для выбранных фильтров. Пожалйста, выберите фильтры
        </div>
      </ul>
    )
  }

  return (
    <ul className="tickets-list">
      {spin}
      {content}
      {errorBlock}
    </ul>
  )
}

export default TicketsList
