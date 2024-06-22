import { configureStore} from "@reduxjs/toolkit";
import quoteReducer from './Features/QuoteSlice' 
import tagReducer from './Features/TagSlice' 
import userReducer from './Features/UserSlice' 
import QuoteLikeReducer from './Features/QuoteLikeSlice'
import commentReducer from './Features/CommentSlice'

import storage from 'redux-persist/lib/storage';
import {
    persistReducer, 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from 'redux-persist';

const persistQuoteConfig = {
  key: 'quotes',
  storage,
}

const persistTagConfig = {
  key: 'tags',
  storage,
}

const persistUserConfig = {
  key: 'user',
  storage,
}
const persistQuoteLikesConfig = {
  key: 'QuoteLikes',
  storage,
}
const persistCommentConfig = {
  key: 'Comment',
  storage,
}

const persistedQuoteReducer = persistReducer(persistQuoteConfig, quoteReducer)
const persistedTagReducer = persistReducer(persistTagConfig, tagReducer)
const persistedUserReducer = persistReducer(persistUserConfig, userReducer)
const persistedQuoteLikeReducer = persistReducer(persistQuoteLikesConfig, QuoteLikeReducer)
const persistedCommentReducer = persistReducer(persistCommentConfig, commentReducer)

export const store = configureStore({
  reducer: {
    Quotes: persistedQuoteReducer, 
    Tags: persistedTagReducer,
    Users: persistedUserReducer,
    QuoteLikes: persistedQuoteLikeReducer,
    Comments: persistedCommentReducer
   },
   
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: {
       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
     },
   }),
})

export const persistor = persistStore(store)