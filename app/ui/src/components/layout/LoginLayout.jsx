import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router';
import LoginHeader from './LoginHeader';
import Sidebar from './Sidebar';
import SattronIcon from './SattronIcon';
import Copyright from '../../Copyright';

export default function LoginLayout() {
  const theme = useTheme();

  const [isSidebarHidden,setIsSidebarHidden] = React.useState(false);
  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
    React.useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
    React.useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setIsNavigationExpanded = React.useCallback(
    (newExpanded) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [
      isOverMdViewport,
      setIsDesktopNavigationExpanded,
      setIsMobileNavigationExpanded,
    ],
  );

  const handleSidebarHide = () => {
    setIsSidebarHidden(true);
  }

  const handleToggleHeaderMenu = React.useCallback(
    (isExpanded) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded],
  );

  const layoutRef = React.useRef(null);

  return (
    <Box
      ref={layoutRef}
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'auto',
        height: '100%',
        width: '100%',
      }}
    >
      <LoginHeader
        logo={<SattronIcon />}
        title=""
        menuOpen={false}
        onToggleMenu={handleToggleHeaderMenu}
      />
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
        
      </Box>
      
    </Box>
  );
}
