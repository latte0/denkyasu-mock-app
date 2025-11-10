'use client';

import { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridRowSelectionModel } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { ShinchokuKanri } from '@/types';

export default function ShinchokuPage() {
  const { shinchokuList, addShinchoku, updateShinchoku, deleteShinchoku } = useData();
  const [rows, setRows] = useState<GridRowsProp>(shinchokuList);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set() });
  const [openDialog, setOpenDialog] = useState(false);
  const [newRecord, setNewRecord] = useState<ShinchokuKanri>({
    id: `S${String(shinchokuList.length + 1).padStart(3, '0')}`,
    casInput: '',
    seikyusakiKaraNoHacchuusho: false,
    mitsumorigaki: false,
    casInputJuchubango: '',
    casHacchuuShinsei: '',
    daisSoufu: '',
    nouhinKakunin: '',
    casHenoKeiyakushoTenpu: false,
    sapTouroku: '',
    jimushoKaraNoSeikyushoJuryo: '',
    dc1HenoSeikyushoSoufu: '',
    seikyusakiHenoSeikyushoSoufu: '',
    shitaukehoutaiShou: false,
    freelance: false,
    sapKeijo: false,
    jimushoHenoHacchuusho: '',
    ankenMei: '',
    tantosha: '',
  });

  const columns: GridColDef[] = [
    { field: 'ankenMei', headerName: '案件名', width: 200, editable: true },
    { field: 'tantosha', headerName: '担当者', width: 120, editable: true },
    { 
      field: 'casInput', 
      headerName: 'CASインプット', 
      width: 130, 
      editable: true,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
    },
    { 
      field: 'seikyusakiKaraNoHacchuusho', 
      headerName: '請求先からの発注書', 
      width: 150, 
      editable: true,
      type: 'boolean',
    },
    { 
      field: 'mitsumorigaki', 
      headerName: '見積書', 
      width: 100, 
      editable: true,
      type: 'boolean',
    },
    { field: 'casInputJuchubango', headerName: '受発注番号', width: 130, editable: true },
    { 
      field: 'casHacchuuShinsei', 
      headerName: 'CAS発注申請', 
      width: 130, 
      editable: true,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
    },
    { 
      field: 'daisSoufu', 
      headerName: 'DAIS送付', 
      width: 130, 
      editable: true,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
    },
    { 
      field: 'nouhinKakunin', 
      headerName: '納品確認', 
      width: 130, 
      editable: true,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
    },
    { 
      field: 'casHenoKeiyakushoTenpu', 
      headerName: 'CASへの契約書添付', 
      width: 150, 
      editable: true,
      type: 'boolean',
    },
    { field: 'sapTouroku', headerName: 'SAP登録', width: 120, editable: true },
    { 
      field: 'jimushoKaraNoSeikyushoJuryo', 
      headerName: '事務所からの請求書受領', 
      width: 180, 
      editable: true,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
    },
    { 
      field: 'dc1HenoSeikyushoSoufu', 
      headerName: 'DC1への請求書送付', 
      width: 160, 
      editable: true,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
    },
    { 
      field: 'seikyusakiHenoSeikyushoSoufu', 
      headerName: '請求先への請求書送付', 
      width: 180, 
      editable: true,
      type: 'date',
      valueGetter: (value) => value ? new Date(value) : null,
    },
    { 
      field: 'shitaukehoutaiShou', 
      headerName: '下請法対象', 
      width: 120, 
      editable: true,
      type: 'boolean',
    },
    { 
      field: 'freelance', 
      headerName: 'フリーランス', 
      width: 120, 
      editable: true,
      type: 'boolean',
    },
    { 
      field: 'sapKeijo', 
      headerName: 'SAP計上', 
      width: 100, 
      editable: true,
      type: 'boolean',
    },
    { field: 'jimushoHenoHacchuusho', headerName: '事務所への発注書', width: 150, editable: true },
  ];

  const handleProcessRowUpdate = (newRow: any) => {
    const updatedRow = { ...newRow };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    updateShinchoku(newRow.id, updatedRow);
    return updatedRow;
  };

  const handleAddRecord = () => {
    addShinchoku(newRecord);
    setRows([...rows, newRecord]);
    setOpenDialog(false);
    setNewRecord({
      id: `S${String(rows.length + 2).padStart(3, '0')}`,
      casInput: '',
      seikyusakiKaraNoHacchuusho: false,
      mitsumorigaki: false,
      casInputJuchubango: '',
      casHacchuuShinsei: '',
      daisSoufu: '',
      nouhinKakunin: '',
      casHenoKeiyakushoTenpu: false,
      sapTouroku: '',
      jimushoKaraNoSeikyushoJuryo: '',
      dc1HenoSeikyushoSoufu: '',
      seikyusakiHenoSeikyushoSoufu: '',
      shitaukehoutaiShou: false,
      freelance: false,
      sapKeijo: false,
      jimushoHenoHacchuusho: '',
      ankenMei: '',
      tantosha: '',
    });
  };

  const handleDeleteSelected = () => {
    if (selectedRows.ids.size === 0) {
      alert('削除する行を選択してください');
      return;
    }
    if (confirm(`${selectedRows.ids.size}件のレコードを削除しますか？`)) {
      selectedRows.ids.forEach(id => deleteShinchoku(String(id)));
      setRows(rows.filter(row => !selectedRows.ids.has(row.id)));
      setSelectedRows({ type: 'include', ids: new Set() });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header title="進捗管理" showBack={true} />
      
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            新規追加
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            disabled={selectedRows.ids.size === 0}
          >
            選択削除 ({selectedRows.ids.size})
          </Button>
        </Box>

        <Box sx={{ height: 600, width: '100%', backgroundColor: 'white' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            processRowUpdate={handleProcessRowUpdate}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
          />
        </Box>
      </Container>

      {/* Add Record Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>新規レコード追加</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="案件名"
              value={newRecord.ankenMei}
              onChange={(e) => setNewRecord({ ...newRecord, ankenMei: e.target.value })}
            />
            <TextField
              fullWidth
              label="担当者"
              value={newRecord.tantosha}
              onChange={(e) => setNewRecord({ ...newRecord, tantosha: e.target.value })}
            />
            <TextField
              fullWidth
              type="date"
              label="CASインプット"
              value={newRecord.casInput}
              onChange={(e) => setNewRecord({ ...newRecord, casInput: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="受発注番号"
              value={newRecord.casInputJuchubango}
              onChange={(e) => setNewRecord({ ...newRecord, casInputJuchubango: e.target.value })}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecord.seikyusakiKaraNoHacchuusho}
                  onChange={(e) => setNewRecord({ ...newRecord, seikyusakiKaraNoHacchuusho: e.target.checked })}
                />
              }
              label="請求先からの発注書"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRecord.mitsumorigaki}
                  onChange={(e) => setNewRecord({ ...newRecord, mitsumorigaki: e.target.checked })}
                />
              }
              label="見積書"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>キャンセル</Button>
          <Button onClick={handleAddRecord} variant="contained">
            追加
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

