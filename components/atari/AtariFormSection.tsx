'use client';

import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Stack, Typography } from '@mui/material';
import SectionTitle from '@/components/common/SectionTitle';
import { AtariInfo, MasterData } from '@/types';

interface AtariFormSectionProps {
  data: AtariInfo;
  onChange: (updates: Partial<AtariInfo>) => void;
  masters: MasterData;
}

export default function AtariFormSection({ data, onChange, masters }: AtariFormSectionProps) {
  const MoneyField = ({ label, value, onChange: onFieldChange }: any) => (
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
      />
    </Box>
  );

  return (
    <Stack spacing={2.5}>
      <Box>
        <SectionTitle title="基本情報" />
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
          <TextField
            fullWidth
            size="small"
            label="タレント名"
            value={data.talentMei}
            onChange={(e) => onChange({ talentMei: e.target.value })}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="使用条件" />
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 1.5 }}>
          <FormControl sx={{ flex: 1, minWidth: '150px' }} size="small">
            <InputLabel>競合範囲</InputLabel>
            <Select
              value={data.kyougohani}
              label="競合範囲"
              onChange={(e) => onChange({ kyougohani: e.target.value })}
            >
              {masters.kyougohani.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1, minWidth: '120px' }} size="small">
            <InputLabel>使用期間</InputLabel>
            <Select
              value={data.shiyoukikan}
              label="使用期間"
              onChange={(e) => onChange({ shiyoukikan: e.target.value })}
            >
              {masters.shiyoukikan.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <FormControl sx={{ flex: 1, minWidth: '150px' }} size="small">
            <InputLabel>使用媒体</InputLabel>
            <Select
              value={data.shiyoubaitai}
              label="使用媒体"
              onChange={(e) => onChange({ shiyoubaitai: e.target.value })}
            >
              {masters.media.map((item) => (
                <MenuItem key={item.code} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1, minWidth: '120px' }} size="small">
            <InputLabel>使用地域</InputLabel>
            <Select
              value={data.shiyochiiki}
              label="使用地域"
              onChange={(e) => onChange({ shiyochiiki: e.target.value })}
            >
              {masters.shiyochiiki.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box>
        <SectionTitle title="金額・出演料" />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1.5 }}>
          <MoneyField
            label="提示金額_1"
            value={data.teijigaku1}
            onChange={(e: any) => onChange({ teijigaku1: Number(e.target.value) })}
          />
          <MoneyField
            label="提示金額_2"
            value={data.teijigaku2}
            onChange={(e: any) => onChange({ teijigaku2: Number(e.target.value) })}
          />
        </Box>
        <FormControl fullWidth size="small">
          <InputLabel>初回出演料</InputLabel>
          <Select
            value={data.shokaiShutsuenryo}
            label="初回出演料"
            onChange={(e) => onChange({ shokaiShutsuenryo: e.target.value })}
          >
            {masters.shokaiShutsuryoKubun.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <SectionTitle title="提案・企画" />
        <Stack spacing={1.5}>
          <FormControl fullWidth size="small">
            <InputLabel>提案可否</InputLabel>
            <Select
              value={data.teianKahi}
              label="提案可否"
              onChange={(e) => onChange({ teianKahi: e.target.value })}
            >
              {masters.teianKahi.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={3}
            label="企画内容"
            value={data.kikakuNaiyo}
            onChange={(e) => onChange({ kikakuNaiyo: e.target.value })}
          />
          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            label="メモ"
            value={data.memo}
            onChange={(e) => onChange({ memo: e.target.value })}
          />
        </Stack>
      </Box>

      <Box>
        <SectionTitle title="管理情報" />
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <FormControl sx={{ flex: 1, minWidth: '200px' }} size="small">
            <InputLabel>情報提供者</InputLabel>
            <Select
              value={data.johoTeikyosha}
              label="情報提供者"
              onChange={(e) => onChange({ johoTeikyosha: e.target.value })}
            >
              {masters.dceTantobu.map((item) => (
                <MenuItem key={item.code} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ flex: 1, minWidth: '180px' }}
            size="small"
            type="date"
            label="情報入力日"
            value={data.johoNyuryokubiDate}
            onChange={(e) => onChange({ johoNyuryokubiDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>
    </Stack>
  );
}

