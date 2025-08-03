import {combineReducers} from "@reduxjs/toolkit"

const rootRouter = combineReducers({
    auth : authReducer,
})
export default rootRouter;