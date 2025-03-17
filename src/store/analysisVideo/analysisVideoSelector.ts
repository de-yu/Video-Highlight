import { groupBy, flow, map, uniq } from 'lodash-es';
import { analysisVideoSelectorDefault } from '@/store/analysisVideo/analysisVideoSelectorDefault';
import { createSelector } from '@reduxjs/toolkit';
import analysisVideoApi from '@/api/AnalysisVideo';
import { AnalysisVideoResponse } from '@/lib/interface/api';

export const analysisVideoSelector = createSelector(
  [
    () => analysisVideoSelectorDefault,
    (state) =>
      analysisVideoApi.endpoints.getAnalysisVideo.select(undefined)(state)
        ?.data,
  ],
  (defaultData, data) => {
    if (data !== undefined) {
      return data;
    }
    return defaultData;
  },
);

// 按照順序取得 section
export const videoSectionsSelector = createSelector(
  analysisVideoSelector,
  (data) => {
    const setSections = flow([
      (arr: AnalysisVideoResponse['highlightSentences']) => map(arr, 'section'),
      (arr: string[]) => uniq(arr),
    ]);
    return setSections(data.highlightSentences);
  },
);

// 使用 section 進行分類
export const videoSentencesSelector = createSelector(
  analysisVideoSelector,
  (data) => groupBy(data.highlightSentences, 'section'),
);

export const videoLengthSelector = createSelector(
  analysisVideoSelector,
  (data) => data.highlightVideoLength,
);

export const hasVideo = createSelector(
  (state) => state.analysisVideo.hasVideo,
  (hasVideo) => hasVideo,
);
