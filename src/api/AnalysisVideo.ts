import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnalysisVideoResponse } from '@/lib/interface/api';

export const analysisVideoApi = createApi({
  reducerPath: 'analysisVideoApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getAnalysisVideo: builder.query<AnalysisVideoResponse, void>({
      query: () => `/api/analysisVideo`,
    }),
  }),
});

export const { useGetAnalysisVideoQuery } = analysisVideoApi;
export default analysisVideoApi;
