'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface EditableTableProps {
  headers: string[];
  children: ReactNode;
}

export default function EditableTable({ headers, children }: EditableTableProps) {
  return (
    <Box sx={{ 
      border: '1px solid #ddd', 
      borderRadius: 1, 
      overflow: 'auto',
    }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        fontSize: '0.875rem' 
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            {headers.map((header, index) => (
              <th 
                key={index} 
                style={{ 
                  padding: '8px', 
                  textAlign: index === 0 ? 'left' : 'right',
                  minWidth: index === 0 ? '100px' : '80px'
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </Box>
  );
}

