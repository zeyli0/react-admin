
import {createSlice} from '@reduxjs/toolkit'; 

export interface menuInter {
  collapsed: boolean
}
const initialState:menuInter = {
    collapsed: false
};
const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        updateCollapse: (state, action) => {
            state.collapsed = action.payload;
        }
    }
});

export const { updateCollapse } = menuSlice.actions;

export default menuSlice.reducer;