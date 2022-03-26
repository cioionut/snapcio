import * as React from 'react';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';

import { useTheme } from '@mui/material/styles';

import { useKeycloak } from '@react-keycloak/web';

// color context
import ColorModeContext from '../../contexts/ColorModeContext';
import Link from './Link';


const pages = {'Live': "/", "Video": "/video", 'Messenger': "/"};
const settings = {'Profile': '/profile', 'Account': '/', 'Dashboard': '/', 'Logout': '/'};

// const siteName = 'Voorbe';
const siteName = 'Snapcio';


const ResponsiveAppBar = () => {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pageMenuItems = Object.entries(pages).map(([pageName, pageHref]) => (
    <MenuItem key={pageName} onClick={handleCloseNavMenu}>
      <Link 
        style={{
          textDecoration: 'none', 
        }}
        sx={{ color: 'text.primary' }}
        href={pageHref}
      >
        {pageName}
      </Link>
    </MenuItem>
  ));

  const pageButtons = Object.entries(pages).map(([pageName, pageHref]) => (
    <Button
      component={Link}
      key={pageName}
      onClick={handleCloseNavMenu}
      sx={{ 
        my: 2, 
        // color: 'white', 
        display: 'block'
      }}
      href={ pageHref }
    >
      {pageName}
    </Button>
  ));
  const logout = !!keycloak.authenticated &&
  <MenuItem key={'logout'} onClick={() => keycloak.logout()}>
    <ListItemIcon>
      <Logout fontSize="small" />
    </ListItemIcon>
    Logout
  </MenuItem>;
  const settingsMenuItems = [
    <MenuItem key={'profile'} onClick={() => router.push('/profile')}>
      <ListItemIcon>
        <Person fontSize="small" />
      </ListItemIcon>
      Profile
    </MenuItem>,
    logout,
    <Divider key={'divider'} />,
  ]

  return (
    <AppBar position="static" color="transparent" sx={{ flexGrow: 1, background: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* small screens */}
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            { siteName }
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              { pageMenuItems }
            </Menu>
          </Box>
          
          {/* medium and large screens */}
          <Link 
            style={{
              textDecoration: 'none', 
            }}
            sx={{ color: 'text.primary' }}
            href='/'
          >
            <Typography
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, 
              fontSize: '1.5rem',
              fontFamily: 'EB Garamond', 
              fontWeight: 550 }}
            >
              { siteName }
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            { pageButtons }
          </Box>
          
          {/* display always */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  alt="I"
                  sx={{ width: 30, height: 30 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsMenuItems}
              <MenuItem key={'darkmode'}>
                <Typography textAlign="center">{'Change theme'}</Typography>
                <IconButton 
                  sx={{ ml: 1 }} 
                  aria-label="switch between lignt and dark mode"
                  onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;