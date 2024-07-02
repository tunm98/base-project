import user from "@/features/User/reducers/index"
import { combineReducers } from "@reduxjs/toolkit"

export default combineReducers({
  user: user.reducer,
})
