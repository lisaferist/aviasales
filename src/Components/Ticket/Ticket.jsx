import './Ticket.scss'

import React from 'react'

function Ticket() {
  return (
    <li className="tickets-list__ticket ticket">
      <p className="ticket__price">13 400р</p>
      <img className="ticket__airline-logo" alt="logo" />
      {/*  вставить в альт имя авиакомпании */}
      <div className="ticket__text-block">
        <p className="ticket__secondary-info">MOW-HKT</p>
        <p className="ticket__primary-info">10.45-08.00</p>
        <p className="ticket__secondary-info">MOW-HKT</p>
        <p className="ticket__primary-info">11.20-00.50</p>
      </div>
      <div className="ticket__text-block">
        <p className="ticket__secondary-info">В ПУТИ</p>
        <p className="ticket__primary-info">21ч 15м</p>
        <p className="ticket__secondary-info">В ПУТИ</p>
        <p className="ticket__primary-info">13ч 30м</p>
      </div>
      <div className="ticket__text-block">
        <p className="ticket__secondary-info">2 пересадки</p>
        <p className="ticket__primary-info">HKG, JNB</p>
        <p className="ticket__secondary-info">1 пересадка</p>
        <p className="ticket__primary-info">HKG</p>
      </div>
    </li>
  )
}

export default Ticket
