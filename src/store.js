import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { timerApi } from './timerApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { taskApi } from './taskApi'
import { configApi } from './configApi'
import { authApi } from './authApi'
import authReducer from './authSlice';
import { dashboardApi } from './dashboardApi'
import { templateApi } from './templateApi'
export const store = configureStore({
    reducer: {
        [timerApi.reducerPath]: timerApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [configApi.reducerPath]: configApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [templateApi.reducerPath]: templateApi.reducer,
        auth: authReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        timerApi.middleware,
        taskApi.middleware,
        configApi.middleware,
        authApi.middleware,
        dashboardApi.middleware,
        templateApi.middleware)
})
setupListeners(store.dispatch)