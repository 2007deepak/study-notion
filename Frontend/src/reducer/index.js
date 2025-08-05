import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice.js"

const rootRouter = combineReducers({
    auth : authReducer,
})
export default rootRouter;