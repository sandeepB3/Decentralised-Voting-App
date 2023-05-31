import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const userSlice = createSlice({
    //Name of slice and initialization
    name: 'userData',
    initialState,

    //Functions to edit state
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload
        }
    }

})

export const {setUserData} = userSlice.actions; //exported to be used anywhere in screens
export default userSlice.reducer;               //exported to be used in store.js