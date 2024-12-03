import React from 'react';
import Leftvar from '../components/Leftvar';
import CardInfo from '../components/CardInfo';
import { Grid } from '@mui/material';

const App = () => {
    return (
        <Grid container spacing={2} padding={2} alignItems="center" justifyContent="center" style={{ height: '100vh' }}> 
            <Grid item xs={3} md={2}>
                <Leftvar />
            </Grid>
            <Grid item xs={9} md={10}>
                <CardInfo />
            </Grid>
        </Grid>
    );
}

export default App;
