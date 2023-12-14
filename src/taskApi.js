import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/pomo/task',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            // console.log('tttttt', token);
            // console.log(token, 'token');;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                headers.set('Content-Type', 'application/json')
                // console.log(headers, 'insider ');
            }
            console.log(headers, 'header ')
            return headers
        },
        credentials: 'include'
    }),
    tagTypes: ['taskSelected', 'taskList'],
    endpoints: (builder) => ({
        fetchTask: builder.query({
            query: () => ({ url: 'list' }),
            providesTags: ['taskList']
        }),
        taskSelected: builder.query({
            query: () => ({ url: 'selected' }),
            providesTags: ['taskSelected']
        }),
        taskSelect: builder.mutation({
            query: (body) => ({
                url: 'selected',
                method: 'POST',
                body: body,

            }),
            invalidatesTags: ['taskSelected']
        }),
        taskAdd: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['taskList']
        })
        // createTask
    })
})
export const { useFetchTaskQuery, useTaskSelectedQuery, useTaskSelectMutation } = taskApi;