import { Box, styled, Typography, IconButton } from '@mui/material';

export const VideoBox = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));

export const VideoSrc = styled('video')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}));

export const VideoText = styled(Typography)(() => ({
  position: 'absolute',
  width: 'fit-content',
  bottom: '30px',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  zIndex: 1,
}));

export const VideoControl = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
}));

export const ControlButton = styled(IconButton)(() => ({
  width: '60px',
  height: '60px',
}));
