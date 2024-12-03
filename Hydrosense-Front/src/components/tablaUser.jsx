import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Snackbar, Alert } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';

function createData(id, name, email, password, position, company_ref) {
  return { id, name, email, password, position, company_ref };
}

function descendingComparator(a, b, orderBy) {
  if (!a[orderBy] || !b[orderBy]) {
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Correo' },
  { id: 'position', numeric: false, disablePadding: false, label: 'Rol' },
  { id: 'company_ref', numeric: false, disablePadding: false, label: 'Referencia de Empresa' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, numSelected, rowCount, onSelectAllClick } = props;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((row) => row.id);
      onSelectAllClick(newSelected);
    } else {
      onSelectAllClick([]);
    }
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ borderBottom: '2px solid #049DD9' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ borderBottom: '2px solid #049DD9' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleOpen } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionado(s)
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Usuarios
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Eliminar">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Agregar Usuario">
            <IconButton onClick={handleOpen}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtrar lista">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', position: '', company_ref: '' });
  const [formErrors, setFormErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Obtener datos iniciales
    const fetchData = async () => {
      try {
        const response = await axios.get('https://23.23.72.57:3000/app/user/company/1');
        setRows(response.data.map(user => createData(user.id, user.name, user.email, user.password, user.position, user.company_ref)));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (newSelected) => {
    setSelected(newSelected);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDenseChange = (event) => {
    setDense(event.target.checked);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNewUser({ name: '', email: '', password: '', position: '', company_ref: '' });
    setFormErrors({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if (!newUser.name) errors.name = 'Nombre es requerido';
    if (!newUser.email) errors.email = 'Correo es requerido';
    if (!newUser.password) errors.password = 'Contraseña es requerida';
    if (!newUser.position) errors.position = 'Rol es requerido';
    if (!newUser.company_ref) errors.company_ref = 'Referencia de empresa es requerida';

    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('https://23.23.72.57:3000/app/user/company/1', newUser);
        setSnackbarMessage('Usuario agregado exitosamente');
        setOpenSnackbar(true);
        handleClose();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} handleOpen={handleOpen} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, border: '2px solid #049DD9' }}
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              onSelectAllClick={handleSelectAllClick}
              rows={rows}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = selected.indexOf(row.id) !== -1;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ borderBottom: '1px solid #e0e0e0' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': row.name }}
                        />
                      </TableCell>
                      <TableCell component="th" id={row.name} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.company_ref}</TableCell>
                    </TableRow>
                  );
                })}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, ingresa los detalles del nuevo usuario.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={newUser.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            margin="dense"
            name="email"
            label="Correo"
            type="email"
            fullWidth
            variant="standard"
            value={newUser.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            margin="dense"
            name="password"
            label="Contraseña"
            type="password"
            fullWidth
            variant="standard"
            value={newUser.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <TextField
            margin="dense"
            name="position"
            label="Rol"
            type="text"
            fullWidth
            variant="standard"
            value={newUser.position}
            onChange={handleChange}
            error={!!formErrors.position}
            helperText={formErrors.position}
          />
          <TextField
            margin="dense"
            name="company_ref"
            label="Referencia de Empresa"
            type="text"
            fullWidth
            variant="standard"
            value={newUser.company_ref}
            onChange={handleChange}
            error={!!formErrors.company_ref}
            helperText={formErrors.company_ref}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Agregar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
