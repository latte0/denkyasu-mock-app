'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('eigyo');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - any credentials work
    if (id && password) {
      router.push('/top');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        py: 4,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              dentsu 🔒
            </Typography>
            <Typography variant="body2" color="text.secondary">
              案件管理システム
            </Typography>
          </Box>

          <form onSubmit={handleLogin}>
            <RadioGroup
              row
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              sx={{ justifyContent: 'center', mb: 3 }}
            >
              <FormControlLabel
                value="eigyo"
                control={<Radio />}
                label="営業職 ⊕"
              />
              <FormControlLabel
                value="atari"
                control={<Radio />}
                label="アタリ職 ⊙"
              />
            </RadioGroup>

            <TextField
              fullWidth
              label="ID"
              placeholder="入力してください"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="PASS"
              placeholder="入力してください"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 4 }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              ログインする
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
