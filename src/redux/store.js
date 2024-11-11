import { configureStore } from '@reduxjs/toolkit';
// import { shazamCoreApi } from './services/shazamCore';
import { UserDataApi , UserAuthApi} from './services/UserApi'
// import playerReducer from './features/playerSlice';
import AuthUserReducer from './features/UserAuthSlice'

export const store = configureStore({
  reducer: {
    // [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [UserDataApi.reducerPath]: UserDataApi.reducer,
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    // player: playerReducer,
    UserAuth: AuthUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(UserDataApi.middleware ,UserAuthApi.middleware),
});