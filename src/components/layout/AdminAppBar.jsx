import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";

function MenuIcon() {
    return null;
}

const AdminAppBar = () => {
  return (
      <AppBar component={"nav"} position={'fixed'}>
          <Toolbar>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
              >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  PFASt
              </Typography>
              <Button color="inherit">Sign out</Button>
          </Toolbar>
      </AppBar>
  )
}

export default AdminAppBar
