import { Box, styled } from '@mui/material';

export const ProgressBar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '30px',
  backgroundColor: theme.palette.grey[200],
  borderRadius: '4px',
  position: 'relative',
  cursor: 'pointer',
}));

export const ProgressTarget = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '3px',
  height: '30px',
  backgroundColor: theme.palette.common.black,
  zIndex: 1,
}));

export const SentenceContent = styled(Box)(() => ({
  position: 'absolute',
  height: '30px',
}));
