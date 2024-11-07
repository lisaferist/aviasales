import { configureStore } from '@reduxjs/toolkit'

import aviaFiltersReducer from './aviaFiltersSlice'
import TicketsSlice from './TicketsSlice'

const appStore = configureStore({
  reducer: {
    aviaFilters: aviaFiltersReducer,
    Tickets: TicketsSlice,
  },
})
export default appStore
