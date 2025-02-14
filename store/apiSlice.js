import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getProduct: builder.query({
      query: (category) => `/products/category/${category}`,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({}),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = apiSlice;
