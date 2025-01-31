import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from '@mui/material';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import EhrLogo from '../../assets/images/Logo-main-1.svg';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateAgent from './CreateAgent';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
const NAVIGATION = [
  {
    segment: '/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: '/setting',
    title: 'Setting',
    icon: <SettingsIcon />,
  },
  {
    segment: '/',
    title: 'Home',
    icon: <SettingsIcon />,
  },
];



function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: 'inline', md: 'none' },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
      {/* <ThemeSwitcher /> */}
    </Stack>
  );
}

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
          <img src={EhrLogo} srcSet="EHR LOGIC" alt="logo EHR" width='150px'/>
    </Stack>
  );
}


function SidebarFooter({ mini }) {
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
    >
      {mini ? '© MUI' : `© ${new Date().getFullYear()} Made By EHR Logic`}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};


function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <CreateAgent />
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutAccount(props) {
  const { window } = props;

  const [session, setSession] = React.useState({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const authentication = React.useMemo(() => ({
    signIn: () => {
      setSession({
        user: {
          name: 'Bharat Kashyap',
          email: 'bharatkashyap@outlook.com',
          image: 'https://avatars.githubusercontent.com/u/19550456',
        },
      });
    },
    signOut: () => {
      setSession(null);
    },
  }), []);

  const router = useDemoRouter('/dashboard');

  const demoWindow = window !== undefined ? window() : undefined;
  
  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      window={demoWindow}
      // branding={branding}
    >

      <DashboardLayout
      themeMode="light" 
              slots={{
                 appTitle: CustomAppTitle,
                 toolbarActions: ToolbarActionsSearch,
                sidebarFooter: SidebarFooter,
              }}      
        sx={{
          display: 'flex',
          flexDirection: 'row',
          '& .MuiAppBar-root': {
            padding: 0.5,
          },
          '& .MuiSwitch-root': {
            display: 'none',
          },
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>

    </AppProvider>
  );
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccount;
