import './TicketsList.scss'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import Ticket from '../Ticket'
import { fetchTickets } from '../../store/getTicketsSlice'

function TicketsList() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTickets())
  }, [dispatch])

  const ticketsArray = useSelector((state) => state.getTickets.tickets)
  const status = useSelector((state) => state.getTickets.status)
  const tickets = ticketsArray.map((ticketObj) => <Ticket ticketObj={ticketObj} key={ticketObj.id} />)
  const content = status === 'resolved' ? tickets : <Spin size="large" />
  return <ul className="tickets-list">{content}</ul>
}

export default TicketsList
