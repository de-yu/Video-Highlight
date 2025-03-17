import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { timeToString } from '@/lib/utils';
import {
  SentenceList,
  SentenceItem,
  SectionTitle,
  SentenceContent,
} from '@/components/TranscriptPanel/TranscriptPanel.style';
import { map, intersection, xor, union } from 'lodash-es';
import { getSectionsColors } from '@/lib/colors';

interface SentenceListProps {
  selectSentenceId: string[];
  sectionSort: string[];
  data: {
    [sectionName: string]: Array<{
      id: string;
      startTime: number;
      sentence: string;
    }>;
  };
  hasClosed?: boolean;
  onClosed?: () => void;
  onClickTime: (time: number) => void;
  onCheckSentence: (ids: string[]) => void;
}

export default function TranscriptPanel({
  selectSentenceId,
  sectionSort,
  data,
  hasClosed = false,
  onClosed = () => {},
  onClickTime,
  onCheckSentence,
}: SentenceListProps) {
  const [checkSentenceId, setCheckSentenceId] = useState<string[]>([]);

  useEffect(() => {
    setCheckSentenceId(selectSentenceId);
  }, [selectSentenceId]);

  // 全選 checkbox 三種狀態
  const allSelectState = (ids: string[]) => {
    const intersectionIds = intersection(ids, checkSentenceId);
    if (intersectionIds.length === ids.length) {
      return 'checked';
    }
    if (intersectionIds.length > 0) {
      return 'indeterminate';
    }
    return 'unchecked';
  };

  // 根據三種不同狀態來設定 checkbox
  const allSelectHandler = (ids: string[]) => {
    const state = allSelectState(ids);
    let newSentenceId: string[] = [];
    if (state === 'checked') {
      newSentenceId = xor(ids, checkSentenceId);
    }
    if (state === 'unchecked') {
      newSentenceId = [...checkSentenceId, ...ids];
    }
    if (state === 'indeterminate') {
      newSentenceId = union(checkSentenceId, ids);
    }
    setCheckSentenceId(newSentenceId);
    onCheckSentence(newSentenceId);
  };

  const handleCheck = (id: string) => {
    const newSentenceId = xor([id], checkSentenceId);
    setCheckSentenceId(newSentenceId);
    onCheckSentence(newSentenceId);
  };

  const handleClickTime = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    time: number,
  ) => {
    onClickTime(time);
    event.stopPropagation();
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Transcript</Typography>
        {hasClosed && (
          <IconButton aria-label="close" size="small" onClick={onClosed}>
            <Icon icon="mi:close" width={24} height={24} />
          </IconButton>
        )}
      </Box>
      <Box sx={{ padding: '0px 16px' }}>
        {sectionSort.map((sectionName) => {
          const sectionId = map(data[sectionName], 'id');

          return (
            <Box key={sectionName}>
              <SectionTitle>
                <Typography variant="h5">{sectionName}</Typography>
                <FormControlLabel
                  label="All Select"
                  control={
                    <Checkbox
                      checked={allSelectState(sectionId) === 'checked'}
                      indeterminate={
                        allSelectState(sectionId) === 'indeterminate'
                      }
                      onChange={() => allSelectHandler(sectionId)}
                    />
                  }
                />
              </SectionTitle>
              <SentenceList>
                {data[sectionName].map((sentence) => {
                  return (
                    <SentenceItem
                      key={sentence.id}
                      onClick={() => handleCheck(sentence.id)}
                    >
                      <Checkbox
                        checked={checkSentenceId.includes(sentence.id)}
                        onChange={() => handleCheck(sentence.id)}
                      />
                      <Button
                        sx={{ color: getSectionsColors(sectionName) }}
                        size="large"
                        variant="text"
                        onClick={(event) =>
                          handleClickTime(event, sentence.startTime)
                        }
                      >
                        {timeToString(sentence.startTime)}
                      </Button>
                      <SentenceContent>{sentence.sentence}</SentenceContent>
                    </SentenceItem>
                  );
                })}
              </SentenceList>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
