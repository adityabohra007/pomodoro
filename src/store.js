import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { timerApi } from './timerApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { taskApi } from './taskApi'
import { configApi } from './configApi'
export const store = configureStore({
    reducer: {
        [timerApi.reducerPath]: timerApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [configApi.reducerPath]: configApi.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        timerApi.middleware,
        taskApi.middleware,
        configApi.middleware)
})
setupListeners(store.dispatch)