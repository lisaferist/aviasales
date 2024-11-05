import './App.scss'

import { useDispatch, useSelector } from 'react-redux'

import AviaFilters from '../AviaFilters'
import FilterTabs from '../FilterTabs'
import TicketsList from '../TicketsList'
import { fetchTickets, increaseNumberOfTicketsDisplayed } from '../../store/getTicketsSlice'

function App() {
  const dispatch = useDispatch()
  const stateStatus = useSelector((state) => state.getTickets.status)
  const numberOfTicketsDisplayed = useSelector((state) => state.getTickets.numberOfTicketsDisplayed)
  const ticketsCount = useSelector((state) => state.getTickets.tickets.length)
  const moreButtonOnclick = (e) => {
    if (stateStatus !== 'stop') {
      dispatch(fetchTickets())
    }
    if (ticketsCount === numberOfTicketsDisplayed) {
      e.target.className = 'more-button more-button--inactive'
      e.target.textContent = 'БИЛЕТОВ БОЛЬШЕ НЕТ'
    } else dispatch(increaseNumberOfTicketsDisplayed({ addedNumber: 5 }))
  }
  return (
    <div className="app">
      <img
        src="https://avatars.mds.yandex.net/i?id=aa364a55f068cde4061ef48cdebbf50d03010547-5162959-images-thumbs&n=13"
        alt="AviaIcon"
        className="avia_icon"
      />
      <AviaFilters />
      <div className="result">
        <FilterTabs />
        <TicketsList numberOfTicketsDisplayed={numberOfTicketsDisplayed} />
        <button className="more-button" onClick={moreButtonOnclick}>
          ПОКАЗАТЬ ЕЩЕ 5
        </button>
      </div>
    </div>
  )
}

export default App
