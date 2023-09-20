import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '@redux/reducer/cardReducer';
// import requiredReducer from '@redux/reducer/requiredReducer';

// store 생성
const store = configureStore({
  reducer: {
    cards: cardReducer,
    // required: requiredReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
