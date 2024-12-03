import React from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CardMedia, CardActionArea, CardActions } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Hydrosense from '../img/Hydrosense.png';
import Makersoft from '../img/Makersoft.png';

const growAnimation = keyframes({
  '0%': {
    transform: 'scale(0.9)',
    opacity: 0,
  },
  '100%': {
    transform: 'scale(1)',
    opacity: 1,
  },
});

const StyledSection = styled('section')({
  background: '#F0F4F8',
  height: '100vh',
  borderRadius: '10px',
});

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: '#2E3B4E',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  animation: `${growAnimation} 0.5s ease-out`,
  backgroundColor: '#FFFFFF', // Asegúrate de que cada tarjeta tenga un fondo blanco
}));

const StyledMenuButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#6BE5F2',
  color: '#FFFFFF',
  borderRadius: '12px',
  padding: '6px 12px',
  '&:hover': {
    backgroundColor: '#49C1E2',
  },
}));

const HomePage = () => {
  return (
    <StyledSection>
      <Container maxWidth="lg" sx={{ mt: 11 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={Makersoft}
                  alt="Makersoft"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Nuestra Empresa
                  </Typography>
                  <Typography variant="body2">
                  MakerSoft es un equipo de expertos en tecnología que desarrolla soluciones innovadoras en software y hardware, destacándose por su enfoque en calidad, creatividad y colaboración para mejorar la eficiencia en diversas industrias.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={Hydrosense}
                  alt="Hydrosense"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Nuestro Producto
                  </Typography>
                  <Typography variant="body2">
                  HydroSense es un sistema avanzado para monitorear y prevenir fallos en motores hidráulicos, mejorando su eficiencia y seguridad en sectores industriales clave.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Otro Contenido
                </Typography>
                <Typography variant="body1">
                ¿Te gustaría conocer más sobre nuestro proceso?
                </Typography>
              </CardContent>
              <CardActions>
                <StyledMenuButton variant="contained" fullWidth>
                  Ver más
                </StyledMenuButton>
              </CardActions>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={Makersoft}
                  alt="Makersoft"
                />
              </CardActionArea>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Contenido adicional
                </Typography>
                <Typography variant="body1">
              ¿Tienes alguna pregunta sobre nuestro producto?
                </Typography>
              </CardContent>
              <CardActions>
                <StyledMenuButton variant="contained" fullWidth>
                  Ver más opciones
                </StyledMenuButton>
              </CardActions>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </StyledSection>
  );
}

export default HomePage;
