import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { timerApi } from './timerApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { taskApi } from './taskApi'
import { configApi } from './configApi'
import { authApi } from './authApi'
import authReducer from './authSlice';
export const store = configureStore({
    reducer: {
        [timerApi.reducerPath]: timerApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [configApi.reducerPath]: configApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        timerApi.middleware,
        taskApi.middleware,
        configApi.middleware, authApi.middleware)
})
setupListeners(store.dispatch)