'use client';

import { Box, TextField, Stack } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import { EigyoInfo } from '@/types';

interface EigyoEigyoSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
}

export default function EigyoEigyoSection({ data, onChange }: EigyoEigyoSectionProps) {
  return (
    <Stack spacing={2.5}>
      <Box>
        <SectionTitle title="営業担当" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            label="担当営業"
            value={data.tantoEigyo}
            onChange={(e) => onChange({ tantoEigyo: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            label="設定CD"
            value={data.setteiCd}
            onChange={(e) => onChange({ setteiCd: e.target.value })}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="制作担当" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            label="担当CD"
            value={data.tantoCdText}
            onChange={(e) => onChange({ tantoCdText: e.target.value })}
          />
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField
              fullWidth
              size="small"
              label="担当CR１"
              value={data.tantoCr1Text}
              onChange={(e) => onChange({ tantoCr1Text: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="担当CR２"
              value={data.tantoCr2Text}
              onChange={(e) => onChange({ tantoCr2Text: e.target.value })}
            />
          </Box>
          <TextField
            fullWidth
            size="small"
            label="担当CP"
            value={data.tantoCp}
            onChange={(e) => onChange({ tantoCp: e.target.value })}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

