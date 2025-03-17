import { Box, styled } from '@mui/material';

export const UploadVideoBg = styled(Box)(({ theme }) => ({
  width: '100vW',
  height: '100VH',
  backgroundColor: theme.palette.grey[300],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
}));

export const UploadAction = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
}));

export const UploadLabel = styled('label')({
  cursor: 'pointer',
});

export const HiddenInput = styled('input')({
  display: 'none',
});
