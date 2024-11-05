/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getSearchId from '../Components/aviasalesApi/getSearchId'
import getPackOfTickets from '../Components/aviasalesApi/getPackOfTickets'

export const fetchTickets = createAsyncThunk('getTickets/fetchTickets', async (arg, thunkObj) => {
  const state = thunkObj.getState()
  if (state.getTickets.status === 'stop') {
    throw new Error('все билеты уже получены')
  }
  const { dispatch } = thunkObj
  let searchId
  if (!state.getTickets.searchId) {
    searchId = await getSearchId()
  } else searchId = state.getTickets.searchId
  let data
  try {
    data = await getPackOfTickets(searchId)
  } catch (e) {
    if (e.message === '500 status') {
      dispatch(fetchTickets())
    } else throw e
  }
  return { ...data, searchId }
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
    searchId: null,
    tickets: [],
    status: null,
    error: null,
    ticketPackNumber: 0,
    numberOfTicketsDisplayed: 5,
  },
  reducers: {
    increaseNumberOfTicketsDisplayed(state, action) {
      if (state.tickets.length - state.numberOfTicketsDisplayed >= 5) {
        state.numberOfTicketsDisplayed += action.payload.addedNumber
      } else state.numberOfTicketsDisplayed = state.tickets.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        if (state.status === null) {
          state.status = 'pending'
        }
        state.error = null
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.ticketPackNumber++
        let tickets
        if (action.payload.tickets) {
          tickets = action.payload.tickets.map((ticket, index) => ({
            id: `${state.ticketPackNumber}${index}`,
            ...ticket,
          }))
        } else tickets = []
        if (!state.searchId) {
          state.searchId = action.payload.searchId
        }
        if (state.status !== 'resolved') {
          state.status = 'resolved'
          state.tickets = tickets
        } else {
          state.tickets = [...state.tickets, ...tickets]
        }
        if (action.payload.stop) {
          state.status = 'stop'
        }
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.error = true
      })
  },
})
export const { increaseNumberOfTicketsDisplayed } = getTicketsSlice.actions
export default getTicketsSlice.reducer
