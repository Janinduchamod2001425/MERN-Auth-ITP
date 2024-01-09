import { apiSlice } from "./apiSlice";

const SELLERS_URL = '/api/sellers';

export const sellersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${SELLERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${SELLERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${SELLERS_URL}/logout`,
                method: 'POST'
            }),
        }),

        updateSeller: builder.mutation({
            query: (data) => ({
                url: `${SELLERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateSellerMutation } = sellersApiSlice;