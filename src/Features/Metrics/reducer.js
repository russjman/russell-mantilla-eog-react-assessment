import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  all: [],
  selected: '',
};

const metricsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('GET_ALL_METRICS', (state, action) => {
      state.all = action.payload;
    })
    .addCase('SELECT_METRIC', (state, action) => {
      state.selected = action.payload;
    });
  // .addCase('TOGGLE_TODO', (state, action) => {
  //   const todo = state[action.payload.index];
  //   // "mutate" the object by overwriting a field
  //   todo.completed = !todo.completed;
  // });
  // .addCase('REMOVE_TODO', (state, action) => {
  //   // Can still return an immutably-updated value if we want to
  //   return state.filter((todo, i) => i !== action.payload.index);
  // })
});

export default metricsReducer;
