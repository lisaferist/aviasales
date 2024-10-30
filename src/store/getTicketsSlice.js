/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = async () => {
  const searchIdResponse = await fetch('https://aviasales-test-api.kata.academy/search')
  const searchIdObj = await searchIdResponse.json()
  const { searchId } = searchIdObj
  return searchId
}

export const fetchAPackOfTickets = async (searchId) => {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  if (!response.ok && response.status !== 500) {
    throw new Error(`ошибка в fetch запросе, статус ${response.status}`)
  }
  const data = await response.json()
  return data
}
export const fetchAllTickets = createAsyncThunk('getTickets/ex', async () => {
  const searchId = await fetchSearchId()
  let isBusy = false
  let isStop = false
  while (!isStop) {
    if (!isBusy) {
      isBusy = true
      // eslint-disable-next-line no-await-in-loop
      const data = await fetchAPackOfTickets(searchId)
      // eslint-disable-next-line no-await-in-loop
      if (data.stop) {
        isStop = true
      } else isBusy = false
    }
  }
})

// const sortTickets = (ticketsArray) => {
//   const ticketsData = {
//     all: [],
//     '0tr': [],
//     '1tr': [],
//     '2tr': [],
//     '3tr': [],
//   }
//   for (let i = 0; i < ticketsArray.length; i++) {
//     if (ticketsArray.all.length === 40) {
//       break
//     }
//     const currentTicket = ticketsArray[i]
//     const ticketTo = currentTicket.segments[0]
//     const ticketFrom = currentTicket.segments[1]
//     if (ticketTo.stop.length === 0 || ticketFrom.stop.length === 0) {
//       ticketsData['0tr'].push(currentTicket)
//     }
//   }
// }

const getTicketsSlice = createSlice({
  name: 'getTickets',
  initialState: {
    tickets: [],
    status: null,
    error: null,
  },
  reducers: {
    fetchSearchId: fetchSearchId(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPackOfTickets.pending, (state) => {
        if (state.status === null) {
          state.status = 'pending'
        }
        state.error = null
      })
      .addCase(fetchAPackOfTickets.fulfilled, (state, action) => {
        if (state.status !== 'resolved') {
          state.status = 'resolved'
          state.tickets = action.payload.tickets
        } else {
          state.tickets = [...state.tickets, ...action.payload.tickets]
        }
      })
      .addCase(fetchAPackOfTickets.rejected, (state) => {
        state.error = true
        state.status = 'error'
      })
  },
})
export default getTicketsSlice.reducer
