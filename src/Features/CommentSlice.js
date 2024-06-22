import { createSlice } from "@reduxjs/toolkit";

const initialState =
{ CommentsArray : [] }

const CommentsSlice = createSlice({
    name: 'Comments',
    initialState,
    reducers: {
        Add_Comment: (state, action) => {
           state.CommentsArray.push(action.payload)
        }
    }
})

export const { Add_Comment} = CommentsSlice.actions;
export default CommentsSlice.reducer