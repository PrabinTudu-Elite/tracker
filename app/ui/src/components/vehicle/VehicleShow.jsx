import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';
import { useDialogs } from '../../hooks/useDialogs/useDialogs';
import useNotifications from '../../hooks/useNotifications/useNotifications';
import {
  deleteOne as deleteVehicle,
  getOne as getVehicle,
} from '../../data/vehicle';
import PageContainer from '../layout/PageContainer';

export default function VehicleShow() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const dialogs = useDialogs();
  const notifications = useNotifications();

  const [vehicle, setVehicle] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const showData = await getVehicle(vehicleId);
      setVehicle(showData);
    } catch (showDataError) {
      setError(showDataError);
    }
    setIsLoading(false);
  }, [vehicleId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleVehicleEdit = React.useCallback(() => {
    navigate(`/vehicles/${vehicleId}/edit`);
  }, [navigate, vehicleId]);

  const handleVehicleDelete = React.useCallback(async () => {
    if (!vehicle) {
      return;
    }

    const confirmed = await dialogs.confirm(
      `Do you wish to delete ${vehicle.veh_num}?`,
      {
        title: `Delete vehicle?`,
        severity: 'error',
        okText: 'Delete',
        cancelText: 'Cancel',
      },
    );

    if (confirmed) {
      setIsLoading(true);
      try {
        await deleteVehicle(Number(vehicleId));

        navigate('/vehicles');

        notifications.show('vehicle deleted successfully.', {
          severity: 'success',
          autoHideDuration: 3000,
        });
      } catch (deleteError) {
        notifications.show(
          `Failed to delete vehicle. Reason:' ${deleteError.message}`,
          {
            severity: 'error',
            autoHideDuration: 3000,
          },
        );
      }
      setIsLoading(false);
    }
  }, [vehicle, dialogs, vehicleId, navigate, notifications]);

  const handleBack = React.useCallback(() => {
    navigate('/vehicles');
  }, [navigate]);

  const renderShow = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            m: 1,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }

    return vehicle ? (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Grid container spacing={2} sx={{ width: '100%' }}>

          <Grid container size={{ xs: 12, sm: 8 }} spacing={1}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <Typography variant="overline">Vehicle Number</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {vehicle.veh_num}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <Typography variant="overline">Vehicle Type</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {vehicle.veh_type}
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <Typography variant="overline">Vehicle Model</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {vehicle.veh_model}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <Typography variant="overline">Vehicle Cost</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {vehicle.veh_cost}
                </Typography>
              </Paper>
            </Grid>


            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <Typography variant="overline">GPS Number</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {vehicle.gps_number}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <Typography variant="overline">Is EV?</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {vehicle.is_ev ? 'Yes' : 'No'}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <Typography variant="overline">Area/Locality</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {vehicle.area_locality}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container size={{ xs: 12, sm: 4 }} spacing={1}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                <img height={150} width={300} src={vehicle.veh_img} />
                <iframe height={150} width={300} src="http://maps.google.com/maps?q=12.927923,77.627108&z=15&output=embed"></iframe>
              </Paper>
            </Grid>
            {/* <Grid size={{ xs: 12, sm: 12 }}>
              <Paper sx={{ px: 2, py: 1 }}>
                
              </Paper>
            </Grid> */}
          </Grid>

        </Grid>
        <hr/>
        {/* <Divider sx={{ my: 3 }} /> */}
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back
          </Button>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleVehicleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleVehicleDelete}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    ) : null;
  }, [
    isLoading,
    error,
    vehicle,
    handleBack,
    handleVehicleEdit,
    handleVehicleDelete,
  ]);

  const pageTitle = `# ${vehicleId}`;

  return (
    <PageContainer
      // title={pageTitle}
      breadcrumbs={[
        { title: 'Vehicles', path: '/vehicles' },
        { title: pageTitle },
      ]}
    >
      <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>{renderShow}</Box>
    </PageContainer>
  );
}
