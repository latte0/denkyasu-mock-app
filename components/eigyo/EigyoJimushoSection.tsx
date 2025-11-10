import { Box, TextField, Stack } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import { EigyoInfo } from '@/types';

interface EigyoJimushoSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
}

export default function EigyoJimushoSection({ data, onChange }: EigyoJimushoSectionProps) {
  return (
    <Stack spacing={2.5}>
      <Box>
        <SectionTitle title="所属事務所" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            label="所属事務所"
            value={data.shozokuJimusho}
            onChange={(e) => onChange({ shozokuJimusho: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            label="事務所担当者"
            value={data.jimushoTantosha}
            onChange={(e) => onChange({ jimushoTantosha: e.target.value })}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="出演管理" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            label="出演管理会社"
            value={data.shutsuenKanri}
            onChange={(e) => onChange({ shutsuenKanri: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            label="出演管理担当者"
            value={data.shutsuenKanriTantosha}
            onChange={(e) => onChange({ shutsuenKanriTantosha: e.target.value })}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

