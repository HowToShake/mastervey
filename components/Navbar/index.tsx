import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Mastervey</Link>
          </Typography>
          {user ? (
            <>
              <Button color="inherit" sx={{ mr: 3 }}>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button color="inherit" onClick={logout}>
                <Link href="/">Logout</Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ mr: 3 }}>
                <Link href="/signup">Signup</Link>
              </Button>
              <Button color="inherit">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
