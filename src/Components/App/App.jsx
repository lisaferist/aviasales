import './App.scss'

import AviaFilters from '../AviaFilters'
import FilterTabs from '../FilterTabs'
import TicketsList from '../TicketsList'

function App() {
  return (
    <div className="app">
      <img src="airplane.svg" alt="AviaIcon" className="avia_icon" />
      <AviaFilters />
      <div className="result">
        <FilterTabs />
        <TicketsList />
      </div>
    </div>
  )
}

export default App
