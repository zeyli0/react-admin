import { createSlice } from "@reduxjs/toolkit";

export interface globalInter {
    language: string 
}
const initialState:globalInter = {
    language: ""
};
const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        updateLanguage(state, action) {
            state.language = action.payload;
        }
    }
});

export default globalSlice.reducer;