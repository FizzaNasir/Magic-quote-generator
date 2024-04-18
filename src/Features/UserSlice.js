import { createSlice } from "@reduxjs/toolkit";

const initialState =
{ UsersArray : [
    {id: 1, email: "fizzanasir976@gmail.com", username: "Fizza nasir", password: "123@xyz", role: "user"},
 ]
}

const UserSlice = createSlice({
    //state here is 
    name: 'Users',
    initialState,
    reducers: {
        AddUser: (state, action) => {
           state.UsersArray.push(action.payload)
        },
    }
})

export const { AddUser} = UserSlice.actions;
export default UserSlice.reducer