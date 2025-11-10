'use client';

import { Box, TextField, Typography } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import { EigyoInfo } from '@/types';

interface EigyoKingakuSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
}

export default function EigyoKingakuSection({ data, onChange }: EigyoKingakuSectionProps) {
  const MoneyField = ({ label, value, onChange: onFieldChange, highlight = false }: any) => (
    <Box sx={{ flex: 1, minWidth: '200px' }}>
      <TextField
        fullWidth
        size="small"
        type="number"
        label={label}
        value={value}
        onChange={onFieldChange}
        InputProps={{
          startAdornment: <Typography sx={{ mr: 1, fontSize: '0.875rem' }}>¥</Typography>,
        }}
        helperText={`${(value / 10000).toLocaleString()}万円`}
        sx={highlight ? {
          '& .MuiOutlinedInput-root': { 
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
            fontWeight: 'bold',
          }
        } : {}}
      />
    </Box>
  );

  return (
    <Box>
      <SectionTitle title="金額情報" />
      
      {/* 契約料 */}
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        契約料
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <MoneyField
          label="電通 他→DCE"
          value={data.keiyakuryoDentsuToDce}
          onChange={(e: any) => onChange({ keiyakuryoDentsuToDce: Number(e.target.value) })}
        />
        <MoneyField
          label="DCE→事務所 他"
          value={data.keiyakuryoDceToJimusho}
          onChange={(e: any) => onChange({ keiyakuryoDceToJimusho: Number(e.target.value) })}
        />
        <MoneyField
          label="差額利益"
          value={data.sagakuRieki}
          onChange={(e: any) => onChange({ sagakuRieki: Number(e.target.value) })}
          highlight={true}
        />
      </Box>

      {/* 手数料 */}
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        手数料
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <MoneyField
          label="本社"
          value={data.tesuuryoHonsha}
          onChange={(e: any) => onChange({ tesuuryoHonsha: Number(e.target.value) })}
        />
        <MoneyField
          label="DCE"
          value={data.tesuuryoDce}
          onChange={(e: any) => onChange({ tesuuryoDce: Number(e.target.value) })}
        />
      </Box>

      {/* 利益・管理費 */}
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        利益・管理費
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <MoneyField
          label="DCE総利益"
          value={data.dceSouRieki}
          onChange={(e: any) => onChange({ dceSouRieki: Number(e.target.value) })}
          highlight={true}
        />
        <MoneyField
          label="企業管理費"
          value={data.kigyoKanrihi}
          onChange={(e: any) => onChange({ kigyoKanrihi: Number(e.target.value) })}
        />
      </Box>
    </Box>
  );
}

