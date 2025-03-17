import { styled, ListItem, Box, List } from '@mui/material';

export const SectionTitle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const SentenceList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}));

export const SentenceItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  alignItems: 'flex-start',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

export const SentenceContent = styled(Box)(() => ({
  minHeight: '42px',
  padding: '12px',
}));
