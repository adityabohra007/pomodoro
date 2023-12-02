import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/pomo/task' }),
    endpoints: (builder) => ({
        fetchTask: builder.query({
            query: () => ({ url: 'list' })
        }),
        taskSelected: builder.query({
            query: () => ({ url: 'selected' })
        }),
        taskSelect: builder.mutation({
            query: (body) => ({
                url: 'selected',
                method: 'PUT',
                body: body
            })
        })
        // createTask
    })
})
export const { useFetchTaskQuery, useTaskSelectedQuery, useTaskSelectMutation } = taskApi;