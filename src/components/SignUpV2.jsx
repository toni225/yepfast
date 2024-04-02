import * as userServices from '../services/user.service'
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel, Typography, Link } from '@mui/joy';
import { Box, Button, TextField, Container } from '@mui/material';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VehicleOwnerIcon, ParkingOwnerIcon } from "./layout/PFAStIcon";


const SignUpV2 = () => {
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [isParkingOwner, setIsParkingOwner] = useState(false);

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

    const handleSelectClick = (isParkingOwner) => {
        if (isParkingOwner) {
            setIsParkingOwner(true);
            setIsOpen(false);
            setSelectedTab(1);
            console.log('User set as parking owner:', isParkingOwner);
        } else {
            setIsOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password should be atleast 8 characters and include at least 1 letter, 1 number and 1 special character!');
            return;
        }

        const payload = {
            email,
            password,
            isParkingOwner
        };

        try {
            const apiResponse = await userServices.signup(payload);

            if (apiResponse.data?.status === 201) {
                toast.success("Account Created!");
                navigate('/login');
            }
        } catch (e) {
            toast.error(e.response.data.data.message);
        }
    };

    return (
        <>
            {/* Parking Owner and Vehicle Owner */}
            {isOpen && (
                <div className="absolute inset-0 bg-gray-500 opacity-50 blur z-10"></div>
            )}
            {isOpen && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-[426px] h-[620px] relative bg-amber-300 rounded-[20px]">
                        <div className="w-[125px] h-[125px] left-[151px] top-[142px] absolute" />
                        <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-slate-800 rounded-[25px] border border-amber-300 justify-center items-center inline-flex hover:cursor-pointer hover:transform hover:scale-125 transition-transform duration-300" onClick={() => setIsOpen(false)}>
                            <div className="text-amber-300 text-2xl font-bold font-['Poppins']">Select</div>
                        </div>
                        <div className="left-[150px] top-[100px] absolute">
                            <VehicleOwnerIcon />
                        </div>

                        <div className="left-[94px] top-[267px] absolute text-slate-800 text-[32px] font-bold font-['Poppins']">Vehicle Owner</div>
                        <div className="w-[238px] left-[94px] top-[371px] absolute text-center text-slate-800 text-opacity-50 text-2xl font-bold font-['Poppins']">Search and locate<br />available parking lots</div>
                        <div className="w-4 h-[17px] left-[190px] top-[21px] absolute bg-slate-800 rounded-full" />
                        <div className="w-4 h-[17px] left-[221px] top-[21px] absolute bg-slate-800 bg-opacity-50 rounded-full" />
                    </div>
                    <div className="w-[426px] h-[620px] relative bg-slate-800 rounded-[20px] ml-4">
                        <div className="w-[150px] h-[150px] left-[138px] top-[121px] absolute" />
                        <div className="px-[62px] py-[7px] left-[113px] top-[535px] absolute bg-amber-300 rounded-[25px] border border-amber-300 justify-center items-center inline-flex hover:cursor-pointer hover:transform hover:scale-125 transition-transform duration-300" onClick={() => handleSelectClick(true)}>
                            <div className="text-slate-800 text-2xl font-bold font-['Poppins']">Select</div>
                        </div>
                        <div className="left-[140px] top-[100px] absolute">
                            <ParkingOwnerIcon />
                        </div>
                        <div className="left-[91px] top-[271px] absolute text-white text-[32px] font-bold font-['Poppins']">Parking Owner</div>
                        <div className="w-[243px] left-[99px] top-[365px] absolute text-center text-white text-opacity-50 text-2xl font-bold font-['Poppins']">List and manage your own<br />parking lots</div>
                        <div className="w-4 h-[17px] left-[188px] top-[21px] absolute bg-amber-300 bg-opacity-50 rounded-full" />
                        <div className="w-4 h-[17px] left-[221px] top-[21px] absolute bg-amber-300 rounded-full" />
                    </div>
                </div>
            )}
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
                        <Tab disableIndicator variant="standard" sx={{ flex: selectedTab === 0 ? '65%' : '35%', transition: 'all 0.5s ease-out' }} className="vehicle-owner-tab">
                            <Box sx={{ padding: '0px 8px' }}>
                                <VehicleOwnerIcon size={25} />
                            </Box>
                            Vehicle Owner
                        </Tab>
                        <Tab disableIndicator variant="standard" sx={{ flex: selectedTab === 1 ? '65%' : '35%', transition: 'all 0.5s ease-out' }} className="parking-owner-tab">
                            <Box sx={{ padding: '0px 8px' }}>
                                <ParkingOwnerIcon size={25} />
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
                                    SIGN UP AS VEHICLE OWNER
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
                                            ':hover': { bgcolor: '#262381' }
                                        }}
                                    >
                                        Sign Up
                                    </Button>
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
                                    SIGN UP AS PARKING OWNER
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
                                        margin="normal"
                                        size="small"
                                        required
                                        fullWidth
                                        autoComplete="current-password"
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
                                            ':hover': { bgcolor: '#F9B94A' }
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </TabPanel>
                </Tabs>
            </Box>
        </>
    );
}

export default SignUpV2;