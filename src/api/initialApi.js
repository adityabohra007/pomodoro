import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/pomo/initiate' }),
    endpoints: (builder) => ({
        fetchTask: builder.query({
            query: () => ({ url: '/' })
        })
    })
})
export const { useFetchTaskQuery } = taskApi;