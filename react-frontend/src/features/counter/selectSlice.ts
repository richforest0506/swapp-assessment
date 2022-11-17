import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SelectState {
  selected: number[]
}

const initialState: SelectState = {
  selected: []
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<number>) => {
      let id = action.payload;

      let newSelected: number[] = [];

      const selectedIndex = state.selected.indexOf(id);
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.selected.slice(1));
      } else if (selectedIndex === state.selected.length - 1) {
        newSelected = newSelected.concat(state.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.selected.slice(0, selectedIndex),
          state.selected.slice(selectedIndex + 1)
        );
      }
      state.selected = newSelected;
    }
  },
});

export const { select } = selectSlice.actions;
export const selectSelected = (state: RootState) => state.select.selected;
export default selectSlice.reducer;
