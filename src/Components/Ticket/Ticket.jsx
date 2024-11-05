import './Ticket.scss'

import React from 'react'
import { format, addMinutes } from 'date-fns'

function Ticket({ ticketObj }) {
  const wordFormat = {
    0: 'пересадок нет',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки',
  }
  const ticketSegmentsTo = ticketObj.segments[0]
  const departureDateTo = new Date(ticketSegmentsTo.date)
  const ticketSegmentsFrom = ticketObj.segments[1]
  const departureDateFrom = new Date(ticketSegmentsFrom.date)
  return (
    <li className="tickets-list__ticket ticket">
      <p className="ticket__price">{ticketObj.price}р</p>
      <img
        className="ticket__airline-logo"
        alt={ticketObj.carrier}
        src={`https://pics.avs.io/99/36/${ticketObj.carrier}.png`}
      />
      {/*  вставить в альт имя авиакомпании */}
      <div className="ticket__text-block">
        <p className="ticket__secondary-info">
          {ticketSegmentsTo.origin}-{ticketSegmentsTo.destination}
        </p>
        <p className="ticket__primary-info">
          {format(departureDateTo, 'HH.mm')}-{format(addMinutes(departureDateTo, ticketSegmentsTo.duration), 'HH.mm')}
        </p>
        <p className="ticket__secondary-info">
          {ticketSegmentsFrom.origin}-{ticketSegmentsFrom.destination}
        </p>
        <p className="ticket__primary-info">
          {format(departureDateFrom, 'HH.mm')}-
          {format(addMinutes(departureDateFrom, ticketSegmentsFrom.duration), 'HH.mm')}
        </p>
      </div>
      <div className="ticket__text-block">
        <p className="ticket__secondary-info">В ПУТИ</p>
        <p className="ticket__primary-info">
          {Math.floor(ticketSegmentsTo.duration / 60)}ч {ticketSegmentsTo.duration % 60}м
        </p>
        <p className="ticket__secondary-info">В ПУТИ</p>
        <p className="ticket__primary-info">
          {Math.floor(ticketSegmentsFrom.duration / 60)}ч {ticketSegmentsFrom.duration % 60}м
        </p>
      </div>
      <div className="ticket__text-block">
        <p className="ticket__secondary-info">{wordFormat[ticketSegmentsTo.stops.length]}</p>
        <p className="ticket__primary-info">{ticketSegmentsTo.stops.join(', ')}</p>
        <p className="ticket__secondary-info">{wordFormat[ticketSegmentsFrom.stops.length]}</p>
        <p className="ticket__primary-info">{ticketSegmentsFrom.stops.join(', ')}</p>
      </div>
    </li>
  )
}

export default Ticket
