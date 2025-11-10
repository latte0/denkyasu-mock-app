'use client';

import { Box, TextField, Stack } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import EditableChipList from '@/components/common/EditableChipList';
import { EigyoInfo } from '@/types';

interface EigyoShutsuenSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
}

export default function EigyoShutsuenSection({ data, onChange }: EigyoShutsuenSectionProps) {
  return (
    <Stack spacing={2.5}>
      <Box>
        <SectionTitle title="出演情報" />
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <TextField
              sx={{ flex: 1, minWidth: '200px' }}
              size="small"
              type="date"
              label="初回出演日"
              value={data.shokaiShutsuenbiDate}
              onChange={(e) => onChange({ shokaiShutsuenbiDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              sx={{ flex: 1, minWidth: '200px' }}
              size="small"
              label="その他分類"
              value={data.sonotaBunrui}
              onChange={(e) => onChange({ sonotaBunrui: e.target.value })}
            />
          </Box>
        </Stack>
      </Box>
      
      <EditableChipList
        label="競合NG"
        items={data.kyougouNg}
        onChange={(items) => onChange({ kyougouNg: items })}
        color="error"
      />
      
      <EditableChipList
        label="競合グレー"
        items={data.kyougouGray}
        onChange={(items) => onChange({ kyougouGray: items })}
        color="warning"
      />
    </Stack>
  );
}

