import { useEffect, useState } from 'react';
import Tab from '@mui/joy/Tab'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
// import CredentialForm from './CredentialForm';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

export default function TabsPricingExample() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleTabChange = (e, newValue) => {
    setSelectedTab(newValue);
  }

  const handleSubmit = () => {
    return;
  }

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
          width: '500px',
          borderRadius: 'lg',
          boxShadow: 'sm',
          overflow: 'auto',
          '.vehicle-owner-tab, .vehicle-owner-tab-panel': {color: '#262341', bgcolor: '#F9D94A',},
          '.vehicle-owner-tab:hover': {color: '#262341', bgcolor: '#F9C94A',},
          '.parking-owner-tab, .parking-owner-tab-panel': {color: '#F9D94A', bgcolor: '#262341',},
          '.parking-owner-tab:hover': {color: '#F9D94A', bgcolor: '#262351',},
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
          <Tab disableIndicator variant="standard" sx={{ flex: selectedTab === 0 ? '65%' : '35%',  transition: 'all 0.5s ease-out'}} className="vehicle-owner-tab">
            Vehicle Owner
          </Tab>
          <Tab disableIndicator variant="standard" sx={{ flex: selectedTab === 1 ? '65%' : '35%',  transition: 'all 0.5s ease-out'}} className="parking-owner-tab">
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
                  minHeight: '60vh'
              }}>
                  <Typography component="h1" variant="h5">
                      Logging in as Vehicle Owner
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
        </TabPanel>
        <TabPanel value={1} className='parking-owner-tab-panel'>
        <Container>
              <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '60vh'
              }}>
                  <Typography component="h1" variant="h5">
                      Logging in as Parking Owner
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
        </TabPanel>
      </Tabs>
    </Box>
  );
}
