import { createSlice } from "@reduxjs/toolkit";

const initialState =
 {
TagsArray: [
    {id: 1, title: "Inspirational", quoteId: 1},
    {id: 2, title: "Motivating", quoteId: 1},
    {id: 3, title: "Inspirational", quoteId: 2},
    {id: 4, title: "Motivating", quoteId: 2},
    {id: 5, title: "Captivating", quoteId: 2},
    {id: 6, title: "Fictional", quoteId: 3},
]
}
const TagSlice = createSlice({
    //state here is 
    name: 'Tags',
    initialState,
    reducers: {
        AddTag: (state, action) => {
            const { title } = action.payload;
            
            if (Array.isArray(title)) {
              
              title.forEach(tagName => {
                state.TagsArray.push({...action.payload, title: tagName });
              });
            }
        },
        DeleteTag: (state, action) => {
         
      },
    }
})

export const { AddTag} = TagSlice.actions;
export default TagSlice.reducer