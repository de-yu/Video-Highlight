import { groupBy, flow, map, uniq } from 'lodash-es';
import { analysisVideoSelectorDefault } from '@/store/analysisVideo/analysisVideoSelectorDefault';
import { createSelector } from '@reduxjs/toolkit';
import analysisVideoApi from '@/api/AnalysisVideo';

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

export const videoSectionsSelector = createSelector(
  analysisVideoSelector,
  (data) => {
    const setSections = flow([
      (arr) => map(arr, 'section'),
      (arr) => uniq(arr),
    ]);
    return setSections(data.highlightSentences);
  },
);

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
