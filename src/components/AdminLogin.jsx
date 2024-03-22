import {Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import * as userService from '../services/user.service';
import {toast} from "react-toastify";

const AdminLogin = () => {
    const navigate = useNavigate();


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {email, password};

        try {
            const apiResponse = await userService.login(payload)

            if (apiResponse.status === 201) {

                const userId = apiResponse.data.data.user.id
                localStorage.setItem('session', apiResponse.data.data.session.access_token)

                try {
                    const userInfoResponse = await userService.getUserInfo(userId)

                    if (userInfoResponse.data.data.length > 0) {
                        console.log(userInfoResponse.data.data[0])
                        localStorage.setItem('user', JSON.stringify(userInfoResponse.data.data[0]))
                        localStorage.setItem('isAdmin', JSON.stringify(apiResponse.data.data.user?.user_metadata.isAdmin))
                        if (apiResponse.data.data.user?.user_metadata.isAdmin) {
                            toast.info("Logged in as Admin");
                        } else {
                            toast.error('Invalid login credentials')
                            userService.signout().then(()=>localStorage.clear());
                        }
                        navigate('/admin/home')
                    } else {
                        toast.error("Please login.")
                        navigate('/admin')
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        } catch (e) {
            toast.error(e.response.data.data.message)
        }
    }

    return (
        <Container>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
                <Typography component="h1" variant="h5">
                    PFASt Admin
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default AdminLogin
