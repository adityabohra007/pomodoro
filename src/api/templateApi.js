import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const templateApi = createApi({
    reducerPath: 'templateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8081/pomo/',
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
    // tagTypes: ['dashboard'],
    endpoints: (builder) => ({
        templateSave: builder.mutation({
            query: (body) => ({ url: 'task/template', method: 'POST', body }),
        }),
        template: builder.query({
            query: () => ({ url: 'task/template', }),
        })
        // createTask
    })
})
export const {
    useTemplateSaveMutation,
    useTemplateQuery
} = templateApi;