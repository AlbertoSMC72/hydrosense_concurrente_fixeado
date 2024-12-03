import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import PowerIcon from '@mui/icons-material/Power';
import VoltageIcon from '@mui/icons-material/ElectricCarOutlined';
import AmpIcon from '@mui/icons-material/ElectricBikeOutlined';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import SpeedIcon from '@mui/icons-material/Speed';
import axios from 'axios';

export default function IntroDivider() {
  const iconColor = '#049DD9';
  const downloadButtonColor = '#3f51b5';

  const [engines, setEngines] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  let userData = JSON.parse(localStorage.getItem('userData'));
  const [newEngine, setNewEngine] = useState({
    name: '',
    HP: '',
    amperage: '',
    voltage: '',
    frequency: '',
    RPM: '',
    company_ref: userData.company.id_company,
  });

  // Obtener datos de motores
  useEffect(() => {
    fetchEngines();
  }, []);

  const fetchEngines = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.get("http://localhost:3001/app/engine/" + userData.company.id_company);
      setEngines(response.data);
    } catch (error) {
      console.error('Error al obtener motores:', error);
    }
  };

  // Manejar el envío del nuevo motor
  const handleAddEngine = async () => {
    try {
      let userData = JSON.parse(localStorage.getItem('userData'));
      await axios.post('http://localhost:3001/app/engine/', newEngine);
      setModalOpen(false);
      setNewEngine({
        name: '',
        HP: '',
        amperage: '',
        voltage: '',
        frequency: '',
        RPM: '',
        company_ref: userData.company.id_company,
      });
      fetchEngines(); // Actualizar la lista de motores
    } catch (error) {
      console.error('Error al agregar motor:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEngine((prev) => ({
      ...prev,
      [name]: name === "HP" || name === "amperage" || name === "voltage" || name === "frequency" || name === "RPM"
        ? Number(value)
        : value,
    }));
  };

  return (
    <Box sx={{ p: 3 }}>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ bgcolor: '#049DD9' }}>
          Agregar Motor
        </Button>
      </Box>
      <Grid container spacing={3}>
        {engines.map((engine) => (
          <Grid item xs={12} sm={6} md={4} key={engine.id_engine}>
            <Card variant="outlined" sx={{ bgcolor: '#E9F1F2', borderColor: '#049DD9' }}>
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {engine.name}
                </Typography>
                <Typography gutterBottom variant="h10" component="div">
                  ID: {engine.id_engine}
                </Typography>
                <Divider sx={{ bgcolor: '#049DD9', my: 2 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Información Técnica:
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
                      <PowerIcon sx={{ color: iconColor }} /> HP: {engine.HP}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
                      <VoltageIcon sx={{ color: iconColor }} /> Voltaje: {engine.voltage}V
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
                      <AmpIcon sx={{ color: iconColor }} /> Amperaje: {engine.amperage}A
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
                      <SyncAltIcon sx={{ color: iconColor }} /> Frecuencia: {engine.frequency}Hz
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: '8px' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem', alignItems: 'center', display: 'flex' }}>
                      <SpeedIcon sx={{ color: iconColor }} /> RPM: {engine.RPM}
                    </Typography>
                  </Stack>
                </Box>
                {/* <Divider sx={{ bgcolor: '#049DD9', my: 2 }} />
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton color="error" aria-label="Eliminar">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    style={{ color: downloadButtonColor }}
                    aria-label="Descargar reporte Excel"
                    onClick={() => alert('Descargando reporte en formato Excel...')}
                  >
                    <GetAppIcon />
                  </IconButton>
                </Stack> */}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para agregar motor */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Agregar Nuevo Motor
          </Typography>
          <Stack spacing={2}>
            <TextField label="Nombre" name="name" value={newEngine.name} onChange={handleInputChange} />
            <TextField label="HP" name="HP" value={newEngine.HP} onChange={handleInputChange} />
            <TextField label="Amperaje" name="amperage" value={newEngine.amperage} onChange={handleInputChange} />
            <TextField label="Voltaje" name="voltage" value={newEngine.voltage} onChange={handleInputChange} />
            <TextField label="Frecuencia" name="frequency" value={newEngine.frequency} onChange={handleInputChange} />
            <TextField label="RPM" name="RPM" value={newEngine.RPM} onChange={handleInputChange} />
            <Button variant="contained" onClick={handleAddEngine} sx={{ bgcolor: '#049DD9' }}>
              Guardar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
