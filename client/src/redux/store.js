import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user';
import partyReducer from './party';

export default configureStore({
  	reducer: {
		user: userReducer,
		party: partyReducer
	},
})