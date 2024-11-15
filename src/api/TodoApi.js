import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from './commomns';
const baseQuery = fetchBaseQuery({
    baseUrl: url + '/todo/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        console.log(token)
        if (token) {
            console.log('Status token adding')
            headers.set('Authorization', `Bearer ${token}`)
            headers.set('Content-Type', 'application/json')
            // console.log(headers, 'insider ');
        }
        // console.log(headers, 'header ')
        return headers
    },
    credentials: 'include'
})
export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: baseQuery,
    tagTypes: ['todo', 'todolist'],
    endpoints: (builder) => ({
        todoCreate: builder.mutation({
            query: (body) => ({
                url: 'create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['todo']
        }),
        todoUpdate: builder.mutation({
            query: (props) => ({
                url: props.id,
                method: 'PUT',
                body: props
            }),
            invalidatesTags: ['status']
        }),
        todoGetList: builder.query({
            query: () => ({
                url: 'list',
            }),
            providesTags: ['todo']
        }),
        todoGet: builder.query({
            query: (id) => ({
                url: id,
            }),
            providesTags: ['todo', 'todolist']
        }),

        // TdoList
        todoListCreate: builder.mutation({
            query: (body) => ({
                url: 'todolist/create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['todolist']
        }),
        todoListUpdate: builder.mutation({
            query: (props) => ({
                url: 'todolist/' + props.id,
                method: 'PUT',
                body: { ...props }
            }),
            invalidatesTags: ['todolist']
        }),
        todoListDelete: builder.mutation({
            query: (id) => ({
                url: 'todolist/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['todolist']
        }),

    }),
})

export const {
    useTodoCreateMutation, useTodoGetListQuery, useTodoUpdateMutation, useTodoGetQuery, useTodoListCreateMutation,
    useTodoListUpdateMutation,
    useTodoListDeleteMutation

} = todoApi;