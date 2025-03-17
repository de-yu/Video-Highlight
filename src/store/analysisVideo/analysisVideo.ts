import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AnalysisVideoState {
  hasVideo: boolean;
}

const initialState: AnalysisVideoState = {
  hasVideo: false,
};

const analysisVideoSlice = createSlice({
  name: 'analysisVideo',
  initialState,
  reducers: {
    setHasVideo: (state, action: PayloadAction<boolean>) => {
      state.hasVideo = action.payload;
    },
  },
});

export const { setHasVideo } = analysisVideoSlice.actions;
export default analysisVideoSlice.reducer;
