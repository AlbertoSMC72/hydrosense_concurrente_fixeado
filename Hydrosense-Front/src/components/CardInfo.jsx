import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp'; // Icono de descarga
import PowerIcon from '@mui/icons-material/Power';
import VoltageIcon from '@mui/icons-material/ElectricCarOutlined'; // Icono de Voltaje
import AmpIcon from '@mui/icons-material/ElectricBikeOutlined'; // Icono de Amperaje
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SpeedIcon from '@mui/icons-material/Speed';

export default function IntroDivider() {
  const iconColor = '#049DD9'; // Color para los iconos de información técnica
  const downloadButtonColor = '#3f51b5'; // Color para el botón de descarga de reportes

  // Función para simular la descarga de un archivo Excel
  const handleDownloadExcel = () => {
    // Aquí iría la lógica para descargar el archivo Excel
    alert('Descargando reporte en formato Excel...');
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 360, bgcolor: '#E9F1F2', borderColor: '#049DD9' }}>
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          Bomba
        </Typography>
        <Divider sx={{ bgcolor: '#049DD9', my: 2 }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Información Técnica:</Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
              <PowerIcon sx={{ color: iconColor }} /> HP: 10
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
              <VoltageIcon sx={{ color: iconColor }} /> Voltaje: 220V
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
              <AmpIcon sx={{ color: iconColor }} /> Amperaje: 15A
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
              <SyncAltIcon sx={{ color: iconColor }} /> Frecuencia: 60Hz
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
              <SpeedIcon sx={{ color: iconColor }} /> RPM: 3000
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ bgcolor: '#049DD9', my: 2 }} />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton color="error" aria-label="Eliminar">
            <DeleteIcon />
          </IconButton>
          <IconButton
            style={{ color: downloadButtonColor }}
            aria-label="Descargar reporte Excel"
            onClick={handleDownloadExcel}
          >
            <GetAppIcon />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
}
