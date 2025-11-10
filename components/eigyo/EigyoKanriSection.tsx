import { Box, TextField, FormControl, Select, MenuItem, Stack, Typography } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import EditableTable from '@/components/common/EditableTable';
import { EigyoInfo, MasterData } from '@/types';

interface EigyoKanriSectionProps {
  data: EigyoInfo;
  onChange: (updates: Partial<EigyoInfo>) => void;
  masters: MasterData;
}

export default function EigyoKanriSection({ data, onChange, masters }: EigyoKanriSectionProps) {
  const dceTantoshaData = [
    { idx: 1, name: data.dceTantosha1, percent: data.dceTantosha1Percent },
    { idx: 2, name: data.dceTantosha2, percent: data.dceTantosha2Percent },
    { idx: 3, name: data.dceTantosha3, percent: data.dceTantosha3Percent },
    { idx: 4, name: data.dceTantosha4, percent: data.dceTantosha4Percent },
  ];

  const shutsuenryoTankaData = [
    { 
      idx: 1, 
      baitai: data.shutsuenryoTanka1Baitai, 
      percent: data.shutsuenryoTanka1Percent, 
      dentsu: data.shutsuenryoTanka1DentsuToDce, 
      jimusho: data.shutsuenryoTanka1DceToJimusho 
    },
    { 
      idx: 2, 
      baitai: data.shutsuenryoTanka2Baitai, 
      percent: data.shutsuenryoTanka2Percent, 
      dentsu: data.shutsuenryoTanka2DentsuToDce, 
      jimusho: data.shutsuenryoTanka2DceToJimusho 
    },
    { 
      idx: 3, 
      baitai: data.shutsuenryoTanka3Baitai, 
      percent: data.shutsuenryoTanka3Percent, 
      dentsu: data.shutsuenryoTanka3DentsuToDce, 
      jimusho: data.shutsuenryoTanka3DceToJimusho 
    },
    { 
      idx: 4, 
      baitai: data.shutsuenryoTanka4Baitai, 
      percent: data.shutsuenryoTanka4Percent, 
      dentsu: data.shutsuenryoTanka4DentsuToDce, 
      jimusho: data.shutsuenryoTanka4DceToJimusho 
    },
    { 
      idx: 5, 
      baitai: data.shutsuenryoTanka5Baitai, 
      percent: data.shutsuenryoTanka5Percent, 
      dentsu: data.shutsuenryoTanka5DentsuToDce, 
      jimusho: data.shutsuenryoTanka5DceToJimusho 
    },
  ];

  return (
    <Stack spacing={2.5}>
      <Box>
        <SectionTitle title="DCE担当者" />
        <EditableTable headers={['担当者', '割合(%)']}>
          {dceTantoshaData.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
              <td style={{ padding: '8px' }}>
                <FormControl fullWidth size="small">
                  <Select
                    value={row.name}
                    onChange={(e) => onChange({ [`dceTantosha${row.idx}`]: e.target.value } as any)}
                    displayEmpty
                  >
                    {row.idx > 1 && <MenuItem value="">なし</MenuItem>}
                    {masters.dceTantobu.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </td>
              <td style={{ padding: '8px' }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={row.percent}
                  onChange={(e) => onChange({ [`dceTantosha${row.idx}Percent`]: Number(e.target.value) } as any)}
                  inputProps={{ style: { textAlign: 'right' } }}
                />
              </td>
            </tr>
          ))}
        </EditableTable>
      </Box>

      <Box>
        <SectionTitle title="出演料単価" />
        <EditableTable headers={['媒体', '%', '電通他→DCE', 'DCE→事務所他']}>
          {shutsuenryoTankaData.map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
              <td style={{ padding: '8px' }}>
                <FormControl fullWidth size="small">
                  <Select
                    value={row.baitai}
                    onChange={(e) => onChange({ [`shutsuenryoTanka${row.idx}Baitai`]: e.target.value } as any)}
                    displayEmpty
                  >
                    <MenuItem value="">なし</MenuItem>
                    {masters.media.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </td>
              <td style={{ padding: '8px' }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={row.percent}
                  onChange={(e) => onChange({ [`shutsuenryoTanka${row.idx}Percent`]: Number(e.target.value) } as any)}
                  inputProps={{ style: { textAlign: 'right' } }}
                />
              </td>
              <td style={{ padding: '8px' }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={row.dentsu}
                  onChange={(e) => onChange({ [`shutsuenryoTanka${row.idx}DentsuToDce`]: Number(e.target.value) } as any)}
                  inputProps={{ style: { textAlign: 'right' } }}
                />
              </td>
              <td style={{ padding: '8px' }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={row.jimusho}
                  onChange={(e) => onChange({ [`shutsuenryoTanka${row.idx}DceToJimusho`]: Number(e.target.value) } as any)}
                  inputProps={{ style: { textAlign: 'right' } }}
                />
              </td>
            </tr>
          ))}
        </EditableTable>
      </Box>

      <Box>
        <SectionTitle title="その他" />
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <FormControl fullWidth size="small">
              <InputLabel>DCE営業担当者</InputLabel>
              <Select
                value={data.dceEigyoTantosha}
                label="DCE営業担当者"
                onChange={(e) => onChange({ dceEigyoTantosha: e.target.value })}
              >
                {masters.dceTantobu.map((item) => (
                  <MenuItem key={item.code} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>DCE契約担当者</InputLabel>
              <Select
                value={data.dceKeiyakuTantosha}
                label="DCE契約担当者"
                onChange={(e) => onChange({ dceKeiyakuTantosha: e.target.value })}
              >
                {masters.dceTantobu.map((item) => (
                  <MenuItem key={item.code} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={3}
            label="業務内容"
            value={data.gyomuNaiyo}
            onChange={(e) => onChange({ gyomuNaiyo: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            label="文責"
            value={data.bunseki}
            onChange={(e) => onChange({ bunseki: e.target.value })}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

