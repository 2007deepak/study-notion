import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice.jsx"

const rootRouter = combineReducers({
    auth : authReducer,
})
export default rootRouter;