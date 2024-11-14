/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getSearchId from '../aviasalesApi/getSearchId'
import getPackOfTickets from '../aviasalesApi/getPackOfTickets'

export const fetchTickets = createAsyncThunk('getTickets/fetchTickets', async (arg, thunkObj) => {
  const state = thunkObj.getState()
  if (state.Tickets.status === 'stop') {
    throw new Error('все билеты уже получены')
  }
  const { dispatch } = thunkObj
  let searchId
  if (!state.Tickets.searchId) {
    searchId = await getSearchId()
  } else searchId = state.Tickets.searchId
  let data
  try {
    data = await getPackOfTickets(searchId)
  } catch (e) {
    if (e.message === '500 status') {
      dispatch(fetchTickets())
      throw e
    } else throw e
  }
  return { ...data, searchId }
})

const TicketsSlice = createSlice({
  name: 'getTickets',
  initialState: {
    gettingInterval: null,
    searchId: null,
    allTickets: [],
    displayedTickets: [],
    status: null,
    error: null,
    errorMessage: null,
    ticketPackNumber: 0,
    numberOfTicketsDisplayed: 5,
  },
  reducers: {
    setGettingInterval(state, action) {
      if (!state.gettingInterval) {
        state.gettingInterval = action.payload.interval
      }
    },
    increaseNumberOfTicketsDisplayed(state, action) {
      if (state.displayedTickets.length - state.numberOfTicketsDisplayed >= 5) {
        state.numberOfTicketsDisplayed += action.payload.addedNumber
      } else state.numberOfTicketsDisplayed = state.displayedTickets.length
    },
    sortTickets(state, action) {
      if (action.payload.filterTab === 'cheap') {
        state.displayedTickets = state.displayedTickets.sort((a, b) => a.price - b.price)
      }
      if (action.payload.filterTab === 'fast') {
        state.displayedTickets = state.displayedTickets.sort((a, b) => {
          const aSegment1 = a.segments[0]
          const aSegment2 = a.segments[1]
          const bSegment1 = b.segments[0]
          const bSegment2 = b.segments[1]
          const aDuration = aSegment1.duration + aSegment2.duration
          const bDuration = bSegment1.duration + bSegment2.duration
          return aDuration - bDuration
        })
      }
    },
    filterTickets(state, action) {
      const filtersArray = action.payload.filters
      if (filtersArray) {
        if (filtersArray.includes('all')) {
          state.displayedTickets = state.allTickets
        } else {
          state.displayedTickets = state.allTickets.filter((ticket) => {
            const ticketSegment1 = ticket.segments[0]
            const ticketSegment2 = ticket.segments[1]
            return (
              filtersArray.includes(ticketSegment1.stops.length.toString()) ||
              filtersArray.includes(ticketSegment2.stops.length.toString())
            )
          })
        }
      }
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
          state.allTickets = tickets
        } else {
          state.allTickets = [...state.allTickets, ...tickets]
        }
        if (action.payload.stop) {
          state.status = 'stop'
          clearInterval(state.gettingInterval)
        }
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        if (action.error.message !== '500 status') {
          state.error = true
          state.errorMessage = action.error.message
        }
      })
  },
})
export const { increaseNumberOfTicketsDisplayed, sortTickets, filterTickets, setGettingInterval } = TicketsSlice.actions
export default TicketsSlice.reducer
