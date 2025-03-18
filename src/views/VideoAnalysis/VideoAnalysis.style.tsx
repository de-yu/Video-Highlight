import { Box, styled } from '@mui/material';

export const VideoAnalysisMain = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.grey[300],
  display: 'flex',
  marginTop: '64px',
  [theme.breakpoints.down('md')]: {
    marginTop: '56px',
  },
}));

export const EditPanel = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[100],
  flex: 1,
  height: '100%',
  padding: '16px',
  overflowY: 'auto',
}));

export const DrawerPanel = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[100],
  padding: '16px',
  minHeight: '100%',
  overflowY: 'auto',
}));

export const VideoPanel = styled(Box)(() => ({
  flex: 1,
  height: '100%',
  padding: '32px',
}));
