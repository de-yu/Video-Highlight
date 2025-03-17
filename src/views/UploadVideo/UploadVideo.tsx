'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from '@/store';
import {
  UploadVideoBg,
  UploadAction,
  HiddenInput,
  UploadLabel,
} from '@/views/UploadVideo/UploadVideo.style';
import { Button, Typography } from '@mui/material';
import { setHasVideo } from '@/store/analysisVideo/analysisVideo';

export default function UploadVideo() {
  const [isUpload, setIsUpload] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        // 確保是影片檔案
        if (!file.type.startsWith('video/')) {
          alert('請上傳影片檔案！');
          event.target.value = '';
          return;
        }
        setIsUpload(true);
        dispatch(setHasVideo(true));
      }
    }
  };

  const analysis = () => {
    router.push('/videoAnalysis');
  };

  return (
    <UploadVideoBg>
      <Typography variant="h4">Upload Video</Typography>
      <UploadAction>
        <Button variant="contained">
          <UploadLabel htmlFor="video-upload">Upload Video</UploadLabel>
          <HiddenInput
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleFileUpload}
          />
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={!isUpload}
          onClick={analysis}
        >
          analysis
        </Button>
      </UploadAction>
    </UploadVideoBg>
  );
}
