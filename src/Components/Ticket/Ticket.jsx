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
  const priceArray = ticketObj.price.toString().split('')
  const price = [...priceArray.slice(0, -3), ' ', ...priceArray.slice(-3)].join('')

  return (
    <li className="tickets-list__ticket ticket">
      <p className="ticket__price">{price} Р</p>
      <img
        className="ticket__airline-logo"
        alt={ticketObj.carrier}
        src={`https://pics.avs.io/99/36/${ticketObj.carrier}.png`}
      />
      {/*  вставить в альт имя авиакомпании */}
      <ul className="ticket__text-block">
        <li className="ticket__secondary-info">
          {ticketSegmentsTo.origin}-{ticketSegmentsTo.destination}
        </li>
        <li className="ticket__primary-info">
          {format(departureDateTo, 'HH.mm')}-{format(addMinutes(departureDateTo, ticketSegmentsTo.duration), 'HH.mm')}
        </li>
        <li className="ticket__secondary-info">
          {ticketSegmentsFrom.origin}-{ticketSegmentsFrom.destination}
        </li>
        <li className="ticket__primary-info">
          {format(departureDateFrom, 'HH.mm')}-
          {format(addMinutes(departureDateFrom, ticketSegmentsFrom.duration), 'HH.mm')}
        </li>
      </ul>
      <ul className="ticket__text-block">
        <li className="ticket__secondary-info">В ПУТИ</li>
        <li className="ticket__primary-info">
          {Math.floor(ticketSegmentsTo.duration / 60)}ч {ticketSegmentsTo.duration % 60}м
        </li>
        <li className="ticket__secondary-info">В ПУТИ</li>
        <li className="ticket__primary-info">
          {Math.floor(ticketSegmentsFrom.duration / 60)}ч {ticketSegmentsFrom.duration % 60}м
        </li>
      </ul>
      <ul className="ticket__text-block">
        <li className="ticket__secondary-info">{wordFormat[ticketSegmentsTo.stops.length]}</li>
        <li className="ticket__primary-info">{ticketSegmentsTo.stops.join(', ')}</li>
        <li className="ticket__secondary-info">{wordFormat[ticketSegmentsFrom.stops.length]}</li>
        <li className="ticket__primary-info">{ticketSegmentsFrom.stops.join(', ')}</li>
      </ul>
    </li>
  )
}

export default Ticket
