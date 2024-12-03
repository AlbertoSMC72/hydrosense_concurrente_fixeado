import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertIcon from '@mui/icons-material/Warning';

export default function IntroDivider() {
  return (
    <Card variant="outlined" sx={{ maxWidth: 360, bgcolor: '#E9F1F2', borderColor: '#049DD9' }}>
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          Bomba
        </Typography>
        <Divider sx={{ bgcolor: '#049DD9', my: 2 }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Alertas:</Typography>
          <Stack spacing={1}>
            <AlertItem severity="error" percentage={75} description="Alta alerta" />
            <AlertItem severity="warning" percentage={50} description="Alerta media" />
            <AlertItem severity="info" percentage={25} description="Alerta baja" />
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

function AlertItem({ severity, percentage, description }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{description}</Typography>
      <Alert severity={severity} icon={<AlertIcon fontSize="medium" />}>
        {percentage}%
      </Alert>
    </Stack>
  );
}
