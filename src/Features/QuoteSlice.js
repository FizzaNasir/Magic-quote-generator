import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 quotesArray: [
    {
     id: 1, 
     quote: "Genius is one percent inspiration and ninety-nine percent perspiration",
     author: "Thomas Edison",
     dateCreated: 'August 19',
     timeCreated: '2023 3:14 PM'  
    },
     {
     id: 2, 
     quote: "You can observe a lot just by watching",
     author: "Yogi Berra",
     dateCreated: 'August 20',
     timeCreated: '2021 3:14 PM'  
    },
    {
     id: 3, 
     quote: "A house divided against itself cannot stand",
     author: "Abraham Lincoln",
     dateCreated: 'August 22',
     timeCreated: '2020 3:14 PM'  
    }
]}
const QuoteSlice = createSlice({
    //state here is 
    name: 'Quotes',
    initialState,
    reducers: {
        AddQuote: (state, action) => {
            state.quotesArray.push(action.payload)
        },
        DeleteQuote: (state, action) => {
            
            state.quotesArray = state.quotesArray.filter(quote => quote.id !== action.payload);
        }
    }
})

export const { AddQuote , DeleteQuote} = QuoteSlice.actions;
export default QuoteSlice.reducer