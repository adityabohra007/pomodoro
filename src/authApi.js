
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { invalid } from "moment";
import { getCookie } from "./cookies";

export const customFetchBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8081/dj-rest-auth/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        // console.log('tttttt', token);
        // console.log(token, 'token');;
        if (token) {
            headers.set('x-csrf',getCookie('csrftoken'))
            // headers.set('Authorization', `Bearer ${token}`)
            headers.set('Content-Type', 'application/json')
            // console.log(headers, 'insider ');
        }
        console.log(headers, 'header ')
        return headers
    },
    credentials: 'include'
})
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBaseQuery,
    tagTypes: ['user'],

    endpoints: (builder) => ({
        tokenRefresh: builder.mutation({
            query: (body) => ({
                url: 'token/refresh', method: 'POST',
                body,

            })
        }),
        user: builder.query({
            query: (body) => ({
                url: 'user',
                method: 'GET',
            }),
            providesTags: ['user']
        }),
        login: builder.mutation({
            query: (body) => ({
                url: 'login/',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['user']
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout/',
                method: 'POST',
            }),
            invalidatesTags: ['user'],
        }),
        google: builder.mutation({
            query: (body) => ({
                url: 'google',
                method: 'POST',
                body
            }),
            invalidatesTags: ['user']

        })
    })
})
export const { useLoginMutation, useUserQuery, useLazyUserQuery, useGoogleMutation, useLogoutMutation } = authApi;

