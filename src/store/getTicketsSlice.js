/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTickets = createAsyncThunk('getTickets/fetchTickets', async () => {
  const searchIdResponse = await fetch('https://aviasales-test-api.kata.academy/search')
  const searchIdObj = await searchIdResponse.json()
  const { searchId } = searchIdObj
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
  if (!response.ok && response.status !== 500) {
    throw new Error(`ошибка в fetch запросе, статус ${response.status}`)
  }
  const data = await response.json()
  return data
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        if (state.status === null) {
          state.status = 'pending'
        }
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        if (state.status !== 'resolved') {
          state.status = 'resolved'
          state.tickets = action.payload.tickets
        } else {
          state.tickets = [...state.tickets, ...action.payload.tickets]
        }
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.error = true
        state.status = 'error'
      })
  },
})
export default getTicketsSlice.reducer
