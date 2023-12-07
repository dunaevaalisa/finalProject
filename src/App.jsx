import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Link, Outlet } from 'react-router-dom';





function App() {
  const linkStyle = {
    textDecoration: 'none', 
    color: 'inherit', 
    marginRight: '20px', 
    fontWeight: 'bold', 
  };


  
  return (
    <>
    <Container maxWidth = "xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
          <Link to="/" style={linkStyle}>Customers</Link>
          </Typography>
          <Typography variant="h6">
          <Link to="/Trainings" style={linkStyle}>Trainings</Link>
          </Typography>
          <Typography variant="h6">
          <Link to="/Calendar" style={linkStyle}>Calendar</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Container>
    </>
  )
}

export default App
