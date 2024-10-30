import './TicketsList.scss'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../Ticket'
import { fetchAPackOfTickets } from '../../store/getTicketsSlice'

function TicketsList() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAPackOfTickets())
  }, [dispatch])

  const ticketsArray = useSelector((state) => state.getTickets.tickets)
  const status = useSelector((state) => state.getTickets.status)
  const tickets = ticketsArray.map((ticketObj) => <Ticket ticketObj={ticketObj} key={ticketObj.id} />)

  return (
    <ul className="tickets-list">
      <li>{status}</li>
      <Ticket />
    </ul>
  )
}

export default TicketsList
