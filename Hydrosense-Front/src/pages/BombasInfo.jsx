import React from 'react';
import Leftvar from '../components/Leftvar';
import CardInfo from '../components/CardInfo';
import { Grid } from '@mui/material';

const App = () => {
    return (
        <Grid container padding={2} alignItems="center" justifyContent="center"> 
            <Grid item xs={3} md={2}>
                <Leftvar />
            </Grid>
            <Grid item xs={10} md={10} marginTop={10}>
                <CardInfo />
            </Grid>
        </Grid>
    );
}

export default App;
