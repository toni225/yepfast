import * as userService from '../services/user.service'
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel, Typography, Link } from '@mui/joy';
import { Box, Button, TextField, Container } from '@mui/material';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VehicleOwnerIcon, ParkingOwnerIcon } from "./layout/PFAStIcon";


const LoginV2 = () => {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,63})+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%^*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      console.log('email eror');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password should be atleast 8 characters and include at least 1 letter, 1 number and 1 special character!');
      console.log('password error');
      return;
    }

    const payload = {
      email, password
    }

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
            localStorage.setItem('isParkingOwner', JSON.stringify(apiResponse.data.data.user?.user_metadata.isParkingOwner))
            if (apiResponse.data.data.user?.user_metadata.isParkingOwner) {
              toast.info("Logged in as Parking Owner");
            } else {
              toast.info("Logged in as Vehicle Owner");
            }
            navigate('/')
          } else {
            toast.warning("Please fill up the docs")
            navigate('/account')
          }
        } catch (e) {
          console.log(e)
        }

        // console.log(apiResponse.data.data.session.access_token)
        // userData.session = apiResponse.data.data
      }
    } catch (e) {
      // console.log(e)
      toast.error(e.response.data.data.message)
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Tabs
        defaultValue={0}
        variant="outlined"
        aria-label="Credential Form"
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          width: '400px',
          borderRadius: 'lg',
          boxShadow: 'sm',
          overflow: 'auto',
          '.vehicle-owner-tab, .vehicle-owner-tab-panel': { color: '#262341', bgcolor: '#F9D94A', },
          '.vehicle-owner-tab:hover': { color: '#262341', bgcolor: '#F9B94A', },
          '.parking-owner-tab, .parking-owner-tab-panel': { color: '#F9D94A', bgcolor: '#262341', },
          '.parking-owner-tab:hover': { color: '#F9D94A', bgcolor: '#262381', },
        }}
      >
        <TabList
          disableUnderline
          sx={{
            width: '100%',
            display: 'flex',
            fontSize: 'sm',
            fontWeight: 'lg',
          }}
        >
          <Tab disableIndicator variant="standard" sx={{  flex: selectedTab === 0 ? '65%' : '35%', transition: 'all 0.5s ease-out' }} className="vehicle-owner-tab">
            <Box sx={{padding: '0px 8px'}}>
              <VehicleOwnerIcon size={25}/> 
            </Box>
            Vehicle Owner
          </Tab>
          <Tab disableIndicator variant="standard" sx={{ flex: selectedTab === 1 ? '65%' : '35%', transition: 'all 0.5s ease-out' }} className="parking-owner-tab">
            <Box sx={{padding: '0px 8px'}}>
              <ParkingOwnerIcon size={25}/> 
            </Box>
            Parking Owner
          </Tab>
        </TabList>
        <TabPanel value={0} className='vehicle-owner-tab-panel'>
          <Container>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '40vh'
            }}>
              <VehicleOwnerIcon size={75} />
              <Typography component="h1" variant="h5" sx={{ color: '#010101', fontWeight: 'lg' }}>
                SIGN IN AS VEHICLE OWNER
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  error={emailError}    //set error flag
                  helperText={emailError ? emailError : ''}  // if password error is then show error, else show none
                  margin="normal"
                  id="email"
                  label="Email Address"
                  type='email'
                  name="email"
                  autoComplete="email"
                  size="small"
                  fullWidth
                  required
                  autoFocus
                  onBlur={() => { setEmailError('') }}    // if error occur then not focus on input, remove error.
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  error={passwordError}   //set error flag
                  helperText={passwordError ? passwordError : ''}  // if password error is then show error, else show none
                  margin="normal"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  required
                  fullWidth
                  onBlur={() => { setPasswordError('') }}   // if error occur then not focus on input, remove error.
                  onChange={e => setPassword(e.target.value)}
                />
                <Button
                  type="submit" 
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2, 
                    bgcolor: '#262351', 
                    color: '#F9D94A', 
                    ':hover': {bgcolor: '#262381'}
                  }}
                >
                  Sign In
                </Button>
              </Box>
                <hr width="100%" margin="16px 0px"/>
              <Box sx={{width: '60%', display: 'flex', justifyContent: 'space-between', mt: '16px'}}>
                <Link href="signup" variant="plain" color="neutral">Sign Up</Link>
                <Link href="recovery" variant="plain" color="neutral">Forgot Password?</Link>
              </Box>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel value={1} className='parking-owner-tab-panel'>
          <Container>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '40vh'
            }}>
              <ParkingOwnerIcon size={75} />
              <Typography component="h1" variant="h5" sx={{ color: '#E7F5F5', fontWeight: 'lg' }}>
                SIGN IN AS PARKING OWNER
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate
                sx={{
                  width: '100%',
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <TextField
                  error={emailError}    //set error flag
                  helperText={emailError ? emailError : ''}  // if password error is then show error, else show none
                  margin="normal"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  size="small"
                  required
                  fullWidth
                  autoFocus
                  onBlur={() => { setEmailError('') }}    // if error occur then not focus on input, remove error.
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  error={passwordError}   //set error flag
                  helperText={passwordError ? passwordError : ''}  // if password error is then show error, else show none
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  onBlur={() => { setPasswordError('') }}   // if error occur then not focus on input, remove error.
                  onChange={e => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: '#F9D94A',
                    color: '#262351',
                    ':hover': {bgcolor: '#F9B94A'}
                  }}
                >
                  Sign In
                </Button>
              </Box>
              <hr width="100%" margin="16px 0px"/>
              <Box sx={{width: '60%', display: 'flex', justifyContent: 'space-between', mt: '16px'}}>
                <Link href="signup" variant="plain" color="neutral">Sign Up</Link>
                <Link href="recovery" variant="plain" color="neutral">Forgot Password?</Link>
              </Box>
            </Box>
          </Container>
        </TabPanel>
      </Tabs>
    </Box>
  );
}

export default LoginV2;