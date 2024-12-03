import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const FrequencyTable = ({ intervals, frequencies, cumulativeFrequencies, percentages }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Intervalo</TableCell>
        <TableCell>Frecuencia</TableCell>
        <TableCell>Frecuencia Acumulada</TableCell>
        <TableCell>Porcentaje (%)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {intervals.map((interval, index) => (
        <TableRow key={interval}>
          <TableCell>{interval}</TableCell>
          <TableCell>{frequencies[index]}</TableCell>
          <TableCell>{cumulativeFrequencies[index]}</TableCell>
          <TableCell>{percentages[index]}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default FrequencyTable;
