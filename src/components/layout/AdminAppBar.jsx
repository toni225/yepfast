import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";

import * as userService from '../../services/user.service';
import {useNavigate} from "react-router-dom";

function MenuIcon() {
    return null;
}

const AdminAppBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar component={"nav"} position={'fixed'}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    PFASt
                </Typography>
                <Button color="inherit" onClick={() => {
                    userService.signout().then(() => {
                        localStorage.clear();
                        navigate('/admin');
                    })
                }}>Sign out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default AdminAppBar
