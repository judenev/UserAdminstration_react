import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/api/apiSlice";
import { adminAuthReducer } from "../Features/reducers/adminAuthSlice";
import { userAuthReducer } from "../Features/reducers/userAuthSlice";


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        userAuth: userAuthReducer,
        adminAuth: adminAuthReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;