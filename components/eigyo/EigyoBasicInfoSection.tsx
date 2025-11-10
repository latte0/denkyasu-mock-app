import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Stack, FormControlLabel, Checkbox, Typography, Chip } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import { EigyoInfo, MasterData } from '@/types';

interface EigyoBasicInfoSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
  masters: MasterData;
}

export default function EigyoBasicInfoSection({ data, onChange, masters }: EigyoBasicInfoSectionProps) {
  return (
    <Stack spacing={2.5}>
      <Box>
        <SectionTitle title="広告主・商品情報" />
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            size="small"
            label="広告主"
            value={data.koukokushu}
            onChange={(e) => onChange({ koukokushu: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            label="商品・サービス"
            value={data.shohinService}
            onChange={(e) => onChange({ shohinService: e.target.value })}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="営業情報" />
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <FormControl fullWidth size="small">
              <InputLabel>営業局</InputLabel>
              <Select
                value={data.eigyokyoku}
                label="営業局"
                onChange={(e) => onChange({ eigyokyoku: e.target.value })}
              >
                {masters.eigyokyoku.map((item) => (
                  <MenuItem key={item.code} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>ステータス</InputLabel>
              <Select
                value={data.status}
                label="ステータス"
                onChange={(e) => onChange({ status: e.target.value })}
              >
                {masters.status.map((item) => (
                  <MenuItem key={item.code} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 100 }} size="small">
              <InputLabel>確度</InputLabel>
              <Select
                value={data.kakudo}
                label="確度"
                onChange={(e) => onChange({ kakudo: e.target.value })}
              >
                {masters.kakudo.map((item) => (
                  <MenuItem key={item.code} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField
              fullWidth
              size="small"
              label="設定局１"
              value={data.setteikyoku1}
              onChange={(e) => onChange({ setteikyoku1: e.target.value })}
            />
            <TextField
              fullWidth
              size="small"
              label="設定局２"
              value={data.setteikyoku2}
              onChange={(e) => onChange({ setteikyoku2: e.target.value })}
            />
          </Box>
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="契約期間" />
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="契約開始"
              value={data.keiyakuKaishiDate}
              onChange={(e) => onChange({ keiyakuKaishiDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <Typography>〜</Typography>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="契約終了"
              value={data.keiyakuShuryoDate}
              onChange={(e) => onChange({ keiyakuShuryoDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={data.keiyakuShuryoBunkatsuKeijo}
                  onChange={(e) => onChange({ keiyakuShuryoBunkatsuKeijo: e.target.checked })}
                />
              }
              label="分割計上"
            />
          </Box>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="納品日"
            value={data.nouhinbiDate}
            onChange={(e) => onChange({ nouhinbiDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="タレント・費目" />
        <Stack spacing={1.5}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              タレント
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {data.talent.map((t, idx) => (
                <Chip key={idx} label={t} size="small" />
              ))}
            </Stack>
          </Box>
          <FormControl fullWidth size="small">
            <InputLabel>費目</InputLabel>
            <Select
              value={data.himoku}
              label="費目"
              onChange={(e) => onChange({ himoku: e.target.value })}
            >
              {masters.himoku.map((item) => (
                <MenuItem key={item.code} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
}

