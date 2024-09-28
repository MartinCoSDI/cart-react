//import {createStore} from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import reducer_s from "./reducer";

const store = configureStore({
    reducer: reducer_s
});

export default store;