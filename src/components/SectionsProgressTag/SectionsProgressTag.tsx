import {
  ProgressBar,
  ProgressTarget,
  SentenceContent,
} from '@/components/SectionsProgressTag/SectionsProgressTag.style';
import { getSectionsColors } from '@/lib/colors';
interface SectionsProgressTagProps {
  videoLength: number;
  progressNow: number;
  data: Array<{
    id: string;
    section: string;
    startTime: number;
    length: number;
  }>;
  setProgressNow: (seconds: number) => void;
}
export default function SectionsProgressTag({
  videoLength = 1,
  progressNow,
  data,
  setProgressNow,
}: SectionsProgressTagProps) {
  const setProgress = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const progressBar = event.currentTarget; // 取得 ProgressBar 本身
    const rect = progressBar.getBoundingClientRect(); // 取得元素的座標
    const relativeX = event.clientX - rect.left; // 計算相對於 ProgressBar 的 X 值
    const progress = relativeX / rect.width; // 計算點擊比例

    setProgressNow(videoLength * progress);
  };

  const progressPos = (start: number) => {
    return (start / videoLength) * 100;
  };

  return (
    <ProgressBar onClick={setProgress}>
      <ProgressTarget style={{ left: `${progressPos(progressNow)}%` }} />
      {data.map((item) => {
        return (
          <SentenceContent
            sx={{
              backgroundColor: getSectionsColors(item.section),
              left: `${progressPos(item.startTime)}%`,
              width: `${progressPos(item.length)}%`,
            }}
            key={item.id}
          />
        );
      })}
    </ProgressBar>
  );
}
