import Customers from "./components/Customers"
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Link, Outlet } from 'react-router-dom'


function App() {

  return (
    <>
    <Container maxWidth = "xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
          <Link to="/">Customers</Link>
          </Typography>
          <Typography variant="h6">
          <Link to="/Trainings">Trainings</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Container>
    </>
  )
}

export default App
