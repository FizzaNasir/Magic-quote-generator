import { createSlice } from "@reduxjs/toolkit";

const initialState =
{ LikesArray : [] }

const QuoteLikeSlice = createSlice({
    //state here is 
    name: 'QuoteLikes',
    initialState,
    reducers: {
        AddLike: (state, action) => {
           state.LikesArray.push(action.payload)
        },
        RemoveLike: (state, action) => {
           state.LikesArray = state.LikesArray.filter(el=> !(el.userId === action.payload.userId && el.quoteId === action.payload.quoteId))
         },
    }
})

export const { AddLike, RemoveLike} = QuoteLikeSlice.actions;
export default QuoteLikeSlice.reducer