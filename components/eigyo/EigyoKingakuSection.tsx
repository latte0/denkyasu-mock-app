'use client';

import { Box, TextField, Stack, Typography } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import { EigyoInfo } from '@/types';

interface EigyoKingakuSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
}

export default function EigyoKingakuSection({ data, onChange }: EigyoKingakuSectionProps) {
  return (
    <Stack spacing={2.5}>
      <Box>
        <SectionTitle title="契約料" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="電通 他→DCE"
            value={data.keiyakuryoDentsuToDce}
            onChange={(e) => onChange({ keiyakuryoDentsuToDce: Number(e.target.value) })}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
            helperText={`${(data.keiyakuryoDentsuToDce / 10000).toLocaleString()}万円`}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label="DCE→事務所 他"
            value={data.keiyakuryoDceToJimusho}
            onChange={(e) => onChange({ keiyakuryoDceToJimusho: Number(e.target.value) })}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
            helperText={`${(data.keiyakuryoDceToJimusho / 10000).toLocaleString()}万円`}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label="差額利益"
            value={data.sagakuRieki}
            onChange={(e) => onChange({ sagakuRieki: Number(e.target.value) })}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
            helperText={`${(data.sagakuRieki / 10000).toLocaleString()}万円`}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                backgroundColor: 'rgba(76, 175, 80, 0.05)' 
              }
            }}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="手数料" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="手数料（本社）"
            value={data.tesuuryoHonsha}
            onChange={(e) => onChange({ tesuuryoHonsha: Number(e.target.value) })}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
            helperText={`${(data.tesuuryoHonsha / 10000).toLocaleString()}万円`}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label="手数料（DCE）"
            value={data.tesuuryoDce}
            onChange={(e) => onChange({ tesuuryoDce: Number(e.target.value) })}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
            helperText={`${(data.tesuuryoDce / 10000).toLocaleString()}万円`}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="利益・管理費" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            type="number"
            label="DCE総利益"
            value={data.dceSouRieki}
            onChange={(e) => onChange({ dceSouRieki: Number(e.target.value) })}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
            helperText={`${(data.dceSouRieki / 10000).toLocaleString()}万円`}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                backgroundColor: 'rgba(33, 150, 243, 0.05)' 
              }
            }}
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label="企業管理費"
            value={data.kigyoKanrihi}
            onChange={(e) => onChange({ kigyoKanrihi: Number(e.target.value) })}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
            helperText={`${(data.kigyoKanrihi / 10000).toLocaleString()}万円`}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

