import React from 'react';
import Grid from '@mui/material/Grid';
import CardInicio from '../components/cardInicio';
import Leftvar from '../components/Leftvar';

const App = () => {
    return (
        <Grid container spacing={2} padding={2} alignItems="center" justifyContent="center" style={{ height: '100vh', overflow: 'hidden' }}>
            <Grid item xs={3} md={2}>
                <Leftvar />
            </Grid>
            <Grid item xs={10} md={10}>
                <CardInicio />
            </Grid>
        </Grid>
    );
}

export default App;
