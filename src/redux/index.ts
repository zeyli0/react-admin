import {configureStore} from '@reduxjs/toolkit';
import menuSlice from './modules/menuSlice';


const store = configureStore({
    reducer: {
        collapsed: menuSlice
    }
});

export default store;