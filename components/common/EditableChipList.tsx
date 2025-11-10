'use client';

import { useState } from 'react';
import { Box, Chip, TextField, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface EditableChipListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export default function EditableChipList({ label, items, onChange, color = 'default' }: EditableChipListProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !items.includes(inputValue.trim())) {
      onChange([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (indexToDelete: number) => {
    onChange(items.filter((_, index) => index !== indexToDelete));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      
      {/* Input field for adding new items */}
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder={`追加する${label}を入力...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton 
          size="small" 
          color="primary" 
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Chip list */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {items.length > 0 ? items.map((item, idx) => (
          <Chip
            key={idx}
            label={item}
            size="small"
            color={color}
            onDelete={() => handleDelete(idx)}
          />
        )) : (
          <Typography variant="body2" color="text.secondary">
            なし
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

