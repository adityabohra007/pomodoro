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
    tagTypes: ['taskSelected', 'taskList', 'tasktimer'],
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['taskList']
        }),
        deleteTask: builder.mutation({
            query: (body) => ({
                url: '',
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['taskList']
        }),
        updateTask: builder.mutation({
            query: (body) => ({
                url: '',
                method: 'PUT',
                body
            }),
            invalidatesTags: ['taskList']
        }),
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
        taskCheckOff: builder.mutation({
            query: (body) => ({
                url: 'checkoff',
                method: 'POST',
                body
            }),
            invalidatesTags: ['taskList']
        }),
        taskCheckOffReset: builder.mutation({
            query: (body) => ({
                url: 'checkoff/reset',
                method: 'POST',
                body
            }),
            invalidatesTags: ['taskList']
        }),
        taskAdd: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['taskList']
        }),
        tasktimer: builder.query({
            query: (body) => ({
                url: 'timer',
            }),
            providesTags: ['tasktimer']
        })
        // createTask
    })
})
export const {
    useFetchTaskQuery,
    useTaskSelectedQuery,
    useTaskSelectMutation,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useTaskCheckOffMutation,
    useTasktimerQuery,
    useTaskCheckOffResetMutation
} = taskApi;