'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  VideoAnalysisMain,
  EditPanel,
  VideoPanel,
  DrawerPanel,
} from '@/views/VideoAnalysis/VideoAnalysis.style';
import { useSelector } from '@/store';
import {
  videoSectionsSelector,
  videoSentencesSelector,
  videoLengthSelector,
  analysisVideoSelector,
  hasVideo,
} from '@/store/analysisVideo/analysisVideoSelector';
import { useGetAnalysisVideoQuery } from '@/api/AnalysisVideo';
import TranscriptPanel from '@/components/TranscriptPanel/TranscriptPanel';
import VideoProgress from '@/components/VideoProgress/VideoProgress';
import SectionsProgressTag from '@/components/SectionsProgressTag/SectionsProgressTag';

const videoData = {
  0: '',
  30: 'video/30sec.mp4',
  60: 'video/60sec.mp4',
  120: 'video/120sec.mp4',
  180: 'video/180sec.mp4',
};

export default function VideoAnalysis() {
  const theme = useTheme();
  const matchPC = useMediaQuery(theme.breakpoints.up('md'));
  const router = useRouter();
  const videoSections = useSelector(videoSectionsSelector);
  const videoSentenceGroup = useSelector(videoSentencesSelector);
  const videoLength = useSelector(videoLengthSelector);
  const videoSentences = useSelector(analysisVideoSelector);
  const isHasVideo = useSelector(hasVideo);

  useGetAnalysisVideoQuery(undefined, {
    skip: !isHasVideo,
  });

  const [checkSentenceId, setCheckSentenceId] = useState<string[]>([]);
  const [timeTag, setTimeTag] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const checkSentence = videoSentences.highlightSentences.filter((item) =>
    checkSentenceId.includes(item.id),
  );

  useEffect(() => {
    if (!isHasVideo) {
      router.push('/');
    }
  }, []);

  const setTime = (time: number) => {
    setTimeTag(time);
  };

  const onCheckSentence = (ids: string[]) => {
    setCheckSentenceId(ids);
  };

  const drawerSwitch = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar sx={{ textAlign: 'center' }}>
          <IconButton
            sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
            color="inherit"
            onClick={drawerSwitch}
          >
            <Icon icon="fa6-solid:list-ul" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <VideoAnalysisMain>
        <Drawer
          sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
          variant={matchPC ? 'permanent' : 'temporary'}
          open={drawerOpen}
          onClose={drawerClose}
        >
          <DrawerPanel>
            <TranscriptPanel
              selectSentenceId={checkSentenceId}
              sectionSort={videoSections}
              data={videoSentenceGroup}
              onClickTime={setTime}
              hasClosed
              onClosed={drawerClose}
              onCheckSentence={onCheckSentence}
            />
          </DrawerPanel>
        </Drawer>
        <EditPanel sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <TranscriptPanel
            selectSentenceId={checkSentenceId}
            sectionSort={videoSections}
            data={videoSentenceGroup}
            onClickTime={setTime}
            onCheckSentence={onCheckSentence}
          />
        </EditPanel>
        <VideoPanel>
          <VideoProgress
            videoCurrentTime={timeTag}
            videoPath={videoData[videoLength]}
            setVideoTime={setTime}
            data={checkSentence}
          />
          <SectionsProgressTag
            data={checkSentence}
            videoLength={videoLength}
            progressNow={timeTag}
            setProgressNow={setTime}
          />
        </VideoPanel>
      </VideoAnalysisMain>
    </Box>
  );
}
