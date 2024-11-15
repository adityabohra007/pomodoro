import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { timerApi } from './api/timerApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { taskApi } from './taskApi'
import { configApi } from './api/configApi'
import { authApi } from './api/authApi'
import authReducer from './authSlice';
import { dashboardApi } from './api/dashboardApi'
import { templateApi } from './api/templateApi'
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