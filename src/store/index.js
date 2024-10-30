import { configureStore } from '@reduxjs/toolkit'

import aviaFiltersReducer from './aviaFiltersSlice'
import getTicketsSlice from './getTicketsSlice'

const appStore = configureStore({
  reducer: {
    aviaFilters: aviaFiltersReducer,
    getTickets: getTicketsSlice,
  },
})
export default appStore
