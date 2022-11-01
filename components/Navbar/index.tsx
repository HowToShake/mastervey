import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "@hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" type="link" href="/">
              Mastervey
            </Button>
          </Typography>
          {user ? (
            <>
              <Button
                color="inherit"
                sx={{ mr: 3 }}
                href="/dashboard"
                type="link"
              >
                Dashboard
              </Button>
              <Button sx={{ mr: 3 }} color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ mr: 3 }} href="/signup" type="link">
                Signup
              </Button>

              <Button color="inherit" sx={{ mr: 3 }} href="/login" type="link">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
