import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function Home() {
  const theme = useTheme();

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

  const handleToggleHeaderMenu = React.useCallback(
    (isExpanded) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded],
  );

  const layoutRef = React.useRef(null);

  return (



    <Grid container spacing={1} sx={{ mb: 0, width: '100%' }}>
      <Grid size={6} >
        <Link style={{ textDecoration: "none" }} to={"/vehicles"}>
          <div class="dash-card l-bg-blue">
            <div class="align-items-center dash-card-statistic-3 p-4">
              <div class="dash-card-icon dash-card-icon-large"><DirectionsCarIcon sx={{ fontSize: '10rem' }}/>
                <h1 class="d-flex align-items-center center-title mb-0">
                  Vehicles List
                </h1>
              </div>


            </div>
          </div>
        </Link>
      </Grid>
      <Grid size={6} >
        <Link style={{ textDecoration: "none" }} to={"/history"}>
          <div class="dash-card l-bg-orange">
            <div class="align-items-center dash-card-statistic-3 p-4">
              <div class="dash-card-icon dash-card-icon-large"><HistoryIcon sx={{ fontSize: '10rem' }}/>
                <h1 class="d-flex align-items-center center-title mb-0">
                  History
                </h1>
              </div>


            </div>
          </div>
        </Link>
      </Grid>
      <Grid size={6} >
        <Link style={{ textDecoration: "none" }} to={"/users"}>
          <div class="dash-card l-bg-green">
            <div class="align-items-center dash-card-statistic-3 p-4">
              <div class="dash-card-icon dash-card-icon-large"><ManageAccountsIcon sx={{ fontSize: '10rem' }}/>
                <h1 class="d-flex align-items-center center-title mb-0">
                  User Management
                </h1>
              </div>


            </div>
          </div>
        </Link>
      </Grid>
      <Grid size={6} >
        <Link style={{ textDecoration: "none" }} to={"/tracking"}>
          <div class="dash-card l-bg-red">
            <div class="align-items-center dash-card-statistic-3 p-4">
              <div class="dash-card-icon dash-card-icon-large"><PinDropIcon sx={{ fontSize: '10rem' }}/>
                <h1 class="d-flex align-items-center center-title mb-0">
                  Live Tracking
                </h1>
              </div>


            </div>
          </div>
        </Link>
      </Grid>
    </Grid>



  );
}
