// store/movieSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slotsGames: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSlotsGames: (state, action) => {
      state.slotsGames = action.payload;
    },
    updateSlotGames: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.slotsGames.findIndex((game) => game.id === id);
      if (index !== -1) {
        state.slotsGames[index] = {
          ...state.slotsGames[index],
          ...updatedData,
        };
      }
    },
  },
});

export const { setSlotsGames, updateSlotGames } = movieSlice.actions;
export default movieSlice.reducer;
