import {configureStore} from '@reduxjs/toolkit';
import menuSlice from './modules/menuSlice';
import globalSlice from './modules/globalSlice';

const store = configureStore({
    reducer: {
        collapsed: menuSlice,
        global: globalSlice
    }
});

export default store;