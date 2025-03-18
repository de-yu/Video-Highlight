import { Box, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import {
  VideoBox,
  VideoText,
  VideoControl,
  ControlButton,
  VideoSrc,
} from '@/components/VideoProgress/VideoProgress.style';
import { timeToString } from '@/lib/utils';

interface VideoProgressProps {
  videoPath: string;
  videoCurrentTime: number;
  setVideoTime: (progress: number) => void;
  data: Array<{
    id: string;
    sentence: string;
    startTime: number;
    length: number;
  }>;
}

export default function VideoProgress({
  videoPath,
  videoCurrentTime,
  setVideoTime,
  data,
}: VideoProgressProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 更新當前時間
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setVideoTime(videoRef.current.currentTime);
    }
  };

  // 影片加載完成，獲取影片總時長
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // 播放 / 暫停
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // 快進 5 秒
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  // 倒退 5 秒
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }
  };

  // 鍵盤控制（空白鍵播放 / 暫停，左右箭頭控制快進 / 倒退）
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Space': // 空白鍵
          event.preventDefault(); // 防止滾動
          togglePlay();
          break;
        case 'ArrowRight': // 右鍵
          skipForward();
          break;
        case 'ArrowLeft': // 左鍵
          skipBackward();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (
      videoRef.current &&
      Math.abs(videoRef.current.currentTime - videoCurrentTime) > 0.1
    ) {
      videoRef.current.currentTime = videoCurrentTime;
    }
  }, [videoCurrentTime]);

  const getVideoText = () => {
    const sentence = data.find(
      (item) =>
        item.startTime <= currentTime &&
        currentTime < item.startTime + item.length,
    );
    if (sentence) {
      return sentence.sentence;
    }
    return '';
  };

  return (
    <Box>
      <Typography variant="h3">Preview</Typography>
      {videoPath !== '' && (
        <VideoBox>
          <VideoSrc
            playsInline // 避免 iphone 直接進入全螢幕
            src={videoPath}
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          {getVideoText() !== '' && <VideoText>{getVideoText()}</VideoText>}
        </VideoBox>
      )}
      {/* 影片控制按鈕 */}
      <VideoControl>
        <ControlButton onClick={skipBackward}>
          <Icon icon="ic:round-fast-rewind" width={50} />
        </ControlButton>
        <ControlButton onClick={togglePlay}>
          {videoRef.current?.paused && (
            <Icon icon="ic:round-play-circle" width={50} />
          )}
          {videoRef.current?.paused === false && (
            <Icon icon="ic:round-pause-circle" width={50} />
          )}
        </ControlButton>
        <ControlButton onClick={skipForward}>
          <Icon icon="ic:round-fast-forward" width={50} />
        </ControlButton>
        {/* 顯示當前秒數 / 總時長 */}
        <Typography variant="h6">
          {timeToString(Math.floor(currentTime))} /
          {timeToString(Math.floor(duration))} 秒
        </Typography>
      </VideoControl>
    </Box>
  );
}
