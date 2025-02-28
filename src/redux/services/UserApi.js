import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const BaseUrl = process.env.REACT_APP_BASE_URL
const BaseUrl = 'http://localhost:5000'


export const UserDataApi = createApi({
  reducerPath: 'UserDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers) => {
      headers.set('auth-token', localStorage.getItem("token")) 
      headers.set('Content-Type', 'application/json')

      return headers;
    },
  }), 
  endpoints: (builder) => ({

    getAllData: builder.query({
      query: ({ page = 1, limit = 10 }) => `data/get-asset?page=${page}&limit=${limit}`,
  }),
    getAllUser: builder.query({
      query: () => `data/get-users`,
  }),
    deleteAllFavSongs: builder.mutation({
      query: () => ({
        url: 'data/delete-all-favsong',
        method: 'DELETE',
      }),
    }),
    deleteAsset: builder.mutation({
      query: (assetId) => ({
        url: `data/delete-asset/${assetId}`,
        method: 'DELETE',
      }),
    }),
    addAsset: builder.mutation({
      query: (newSong) => ({
        url: 'data/add-asset',
        method: 'POST',
        body: newSong,
      }),
    }),
    getAssetConditions: builder.query({
      query: () => `data/get-condition`,
  }),
    getAssetValue: builder.query({
      query: () => `data/get-value`,
  })

  }),
});

  export const UserAuthApi = createApi({
    reducerPath: 'UserAuthApi',
    baseQuery: fetchBaseQuery({
      baseUrl: BaseUrl,
      prepareHeaders: (headers) => {
        headers.set('auth-token', localStorage.getItem('token')) 
        headers.set('Content-Type', 'application/json')

        return headers;
      },
    }), 
    endpoints: (builder) => ({
      userAuthentication: builder.mutation({
        query: () => ({
          url: 'auth/getuser',
          method: 'POST',
        }),
      }),
      userLogin: builder.mutation({
        query: ({email,password}) => ({
          url: 'auth/login',
          method: 'POST',
          body:JSON.stringify({ email, password })
        }),
      }),
      userSignup: builder.mutation({
        query: ({phoneNumber,name,email,password}) => ({
          url: 'auth',
          method: 'POST',
          body:JSON.stringify({phoneNumber,name, email, password })
        }),
      }),
      
      
     
      
    }),
  });

export const {
  useGetAllDataQuery,
  useGetAllUserQuery,
  useGetAssetConditionsQuery,
  useGetAssetValueQuery,
  useDeleteAllFavSongsMutation,
  useAddAssetMutation ,
  useDeleteAssetMutation,
} = UserDataApi;

export const {
  useUserAuthenticationMutation,
  useUserLoginMutation,
  useUserSignupMutation,
} = UserAuthApi;