/* eslint-disable no-param-reassign */
// отключаю правило тк использую redux toolkit
import { createSlice } from '@reduxjs/toolkit'

const aviaFiltersSlice = createSlice({
  name: 'aviaFilters',
  initialState: {
    activeAviaFilter: [],
    aviaFilters: [
      { id: 'all', text: 'Все', isActive: false },
      { id: '0tr', text: 'Без пересадок', isActive: false },
      { id: '1tr', text: '1 пересадка', isActive: false },
      { id: '2tr', text: '2 пересадки', isActive: false },
      { id: '3tr', text: '3 пересадки', isActive: false },
    ],
  },
  reducers: {
    checkboxChanged(state, action) {
      function aviaFiltersArrayEdit(filterArray, eventTargetId) {
        const editingArray = filterArray.map((filter) => {
          if (filter.id === eventTargetId) {
            return { ...filter, isActive: !filter.isActive }
          }
          return filter
        })
        const eventTargetFilterObj = editingArray.filter((filter) => filter.id === eventTargetId)[0]
        const allFilterObj = editingArray.filter((filter) => filter.id === 'all')[0]
        if (eventTargetId === 'all') {
          return allFilterObj.isActive
            ? editingArray.map((filter) => ({ ...filter, isActive: true }))
            : editingArray.map((filter) => ({ ...filter, isActive: false }))
        }
        if (allFilterObj.isActive && !eventTargetFilterObj.isActive) {
          return editingArray.map((filter) => {
            if (filter.id === 'all' || filter.id === eventTargetId) {
              return { ...filter, isActive: false }
            }
            return filter
          })
        }
        if (
          !allFilterObj.isActive &&
          editingArray.filter((filter) => filter.isActive).length === editingArray.length - 1
        ) {
          return editingArray.map((filter) => ({ ...filter, isActive: true }))
        }
        return editingArray
      }
      const newFilters = aviaFiltersArrayEdit(state.aviaFilters, action.payload.filterId)
      state.aviaFilters = newFilters
      state.activeAviaFilter = newFilters
        .map((filter) => {
          if (filter.isActive) {
            return filter.id
          }
          return null
        })
        .filter((filter) => filter !== null)
    },
  },
})

export const { checkboxChanged } = aviaFiltersSlice.actions
export default aviaFiltersSlice.reducer
