//React Reducer Configuration
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        //Name of slice: Name of Object
        user: userSlice,
    }
})