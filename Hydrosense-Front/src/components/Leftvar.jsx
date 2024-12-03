import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTheme, useMediaQuery } from '@mui/material';
import { blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';

// Definir colores
const iconColor = blue[500];
const selectedBgColor = blue[100];
const toolbarBgColor = 'radial-gradient(circle at top left, #6BE5F2, #049DD9, #6BE5F2, #03588C)';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detectar pantallas pequeñas
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const drawer = (
    <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%', marginTop: 10}}>
      <List>
        {[{ text: 'Inicio', icon: <HomeOutlinedIcon sx={{ color: iconColor }} />, path: '/menu' },
          { text: 'Usuarios', icon: <PeopleOutlineIcon sx={{ color: iconColor }} />, path: '/usuarios' },
          { text: 'Gráficas', icon: <LeaderboardOutlinedIcon sx={{ color: iconColor }} />, path: '/graficas' },
          { text: 'Alertas', icon: <WarningAmberOutlinedIcon sx={{ color: iconColor }} />, path: '/alertas' },
          { text: 'Reportes', icon: <ArticleOutlinedIcon sx={{ color: iconColor }} />, path: '/reportes' },
          { text: 'Información de Bombas', icon: <LocalDrinkOutlinedIcon sx={{ color: iconColor }} />, path: '/agregar-bomba' }]
          .map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  '&:hover': { backgroundColor: selectedBgColor },
                  '&.Mui-selected': { backgroundColor: selectedBgColor },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ '&:hover': { backgroundColor: selectedBgColor } }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: iconColor }} />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, background: toolbarBgColor }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Hydrosense
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Drawer en desktop y mobile */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu options"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Toolbar />
        {/* Aquí puedes agregar el contenido principal */}
      </Box>
    </Box>
  );
}
