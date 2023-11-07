import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "../features/userApi"

export const store = configureStore({
  reducer: {
    [userApi.reducerPath] : userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    userApi.middleware
  ])
})

//export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
/*export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>*/
