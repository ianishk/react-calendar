import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "../features/dateSlice";
import eventReducer from "../features/eventSlice"


const store = configureStore({
    reducer: {
        date: dateReducer,
        event: eventReducer
    }
})

export default store