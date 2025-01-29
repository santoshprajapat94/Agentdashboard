import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateAgent from './CreateAgent';

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
      <CreateAgent/>
      
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

  const authentication = React.useMemo(() => {
    return {
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
    };
  }, []);

  const router = useDemoRouter('/');

  const demoWindow = window !== undefined ? window() : undefined;

  const branding = {
    title: 'Vitefire',  
  };

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      window={demoWindow}
      branding={branding}
    >
      <DashboardLayout
         sx={{
          display: 'flex',
          flexDirection: 'row', 
          '& .MuiAppBar-root': {
            padding: 0.5,
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
