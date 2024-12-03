import React from 'react';
import Leftvar from '../components/Leftvar';
import TablaReportes from '../components/tablaReport';
import { Grid } from '@mui/material';

const App = () => {
    return (
        <Grid container spacing={2} padding={2} alignItems="center" justifyContent="center" style={{ height: '100vh' }}> 
            <Grid item xs={3} md={2}>
                <Leftvar />
            </Grid>
            <Grid item xs={10} md={10}>
                <TablaReportes />
            </Grid>
        </Grid>
    );
}

export default App;
