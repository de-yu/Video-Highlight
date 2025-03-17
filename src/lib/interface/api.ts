export interface AnalysisVideoResponse {
  highlightVideoLength: 0 | 30 | 60 | 120 | 180;
  highlightSentences: {
    id: string;
    startTime: number;
    length: number;
    sentence: string;
    section: string;
  }[];
}
