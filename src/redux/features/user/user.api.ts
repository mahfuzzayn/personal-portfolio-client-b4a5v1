import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query({
            query: (data) => ({
                url: `/users/${data.email}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetMeQuery } = userApi;
