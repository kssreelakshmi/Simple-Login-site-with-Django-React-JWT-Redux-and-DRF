import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSliceReducer from "./Authentication/AuthenticationSlice.jsx";
import UserBasicDetailsSliceReducer from './User/UserBasicDetailsSlice.jsx';

export default configureStore({
  reducer: {
    authentication_user: AuthenticationSliceReducer,
    user_basic_details: UserBasicDetailsSliceReducer,
  },
});