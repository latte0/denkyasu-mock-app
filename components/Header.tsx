'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = false }: HeaderProps) {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#d32f2f' }}>
      <Toolbar>
        {showBack && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => router.back()}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" component="div">
            dentsu
          </Typography>
          <Typography variant="body2" component="div">
            🔒
          </Typography>
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

