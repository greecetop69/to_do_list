import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const goodsApi = createApi({
    reducerPath: 'goodsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['product'],
    endpoints: (build) => ({
        getGoods: build.query({
            query: () => ({
                url: `goods`
            }),

            providesTags: result => ['product']
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['product']
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `goods/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product']
        }),
        changeProduct: build.mutation({
            query: (item) => ({
                url: `goods/${item.id}`,
                method: 'PUT',
                body: item,
            }),
            invalidatesTags: ['product']
        }),
    })
})
export const { useGetGoodsQuery, useAddProductMutation, useDeleteProductMutation, useChangeProductMutation } = goodsApi