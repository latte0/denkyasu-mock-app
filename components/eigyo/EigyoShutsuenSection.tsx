'use client';

import { Box, TextField, Stack, Typography, Chip } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import { EigyoInfo } from '@/types';

interface EigyoShutsuenSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
}

export default function EigyoShutsuenSection({ data, onChange }: EigyoShutsuenSectionProps) {
  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        size="small"
        type="date"
        label="初回出演日"
        value={data.shokaiShutsuenbiDate}
        onChange={(e) => onChange({ shokaiShutsuenbiDate: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        size="small"
        label="その他分類"
        value={data.sonotaBunrui}
        onChange={(e) => onChange({ sonotaBunrui: e.target.value })}
      />
      <Box>
        <SectionTitle title="競合NG" />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {data.kyougouNg.length > 0 ? data.kyougouNg.map((item, idx) => (
            <Chip key={idx} label={item} size="small" color="error" />
          )) : <Typography variant="body2" color="text.secondary">なし</Typography>}
        </Stack>
      </Box>
    </Stack>
  );
}

