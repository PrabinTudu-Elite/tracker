import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import useNotifications from '../../hooks/useNotifications/useNotifications';
import {
  getOne as getVehicle,
  updateOne as updateVehicle,
  validate as validateVehicle,
} from '../../data/vehicle';
import VehicleForm from './VehicleForm';
import PageContainer from '../layout/PageContainer';

function VehicleEditForm({ initialValues, onSubmit }) {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const notifications = useNotifications();

  const [formState, setFormState] = React.useState(() => ({
    values: initialValues,
    errors: {},
  }));
  const formValues = formState.values;
  const formErrors = formState.errors;

  const setFormValues = React.useCallback((newFormValues) => {
    setFormState((previousState) => ({
      ...previousState,
      values: newFormValues,
    }));
  }, []);

  const setFormErrors = React.useCallback((newFormErrors) => {
    setFormState((previousState) => ({
      ...previousState,
      errors: newFormErrors,
    }));
  }, []);

  const handleFormFieldChange = React.useCallback(
    (name, value) => {
      const validateField = async (values) => {
        const { issues } = validateVehicle(values);
        setFormErrors({
          ...formErrors,
          [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
        });
      };

      const newFormValues = { ...formValues, [name]: value };

      setFormValues(newFormValues);
      validateField(newFormValues);
    },
    [formValues, formErrors, setFormErrors, setFormValues],
  );

  const handleFormReset = React.useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues, setFormValues]);

  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateVehicle(formValues);
    if (issues && issues.length > 0) {
      setFormErrors(
        Object.fromEntries(issues.map((issue) => [issue.path?.[0], issue.message])),
      );
      return;
    }
    setFormErrors({});

    try {
      onSubmit(formValues).then(() => {
        notifications.show('Vehicle edited successfully.', {
          severity: 'success',
          autoHideDuration: 3000,
        });
        
      });


    } catch (editError) {
      notifications.show(`Failed to edit vehicle. Reason: ${editError.message}`, {
        severity: 'error',
        autoHideDuration: 3000,
      });
      throw editError;
    }
  }, [formValues, navigate, notifications, onSubmit, setFormErrors]);

  return (
    <VehicleForm
      formState={formState}
      onFieldChange={handleFormFieldChange}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
      submitButtonLabel="Save"
      backButtonPath={location.state?.from}
    />
  );
}

VehicleEditForm.propTypes = {
  initialValues: PropTypes.shape({
    veh_number: PropTypes.string,
    veh_type: PropTypes.oneOf(['Car', 'Truck', 'Bus']),
    veh_model: PropTypes.string,
    veh_cost: PropTypes.string,
    area_locality: PropTypes.string,
    gps_number: PropTypes.string,
    veh_image: PropTypes.string,
    is_ev: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default function VehicleEdit() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = React.useCallback(
    async (formValues) => {
      const updatedData = await updateVehicle(Number(vehicleId), formValues);
      setVehicle(updatedData);
      navigate(`/vehicles/${vehicleId}`);
    },
    [vehicleId],
  );

  const renderEdit = React.useMemo(() => {
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
      <VehicleEditForm initialValues={vehicle} onSubmit={handleSubmit} />
    ) : null;
  }, [isLoading, error, vehicle, handleSubmit]);

  return (
    <PageContainer
      breadcrumbs={[
        { title: 'Vehicles', path: '/vehicles' },
        { title: `# ${vehicleId}`, path: `/vehicles/${vehicleId}` },
        { title: 'Edit' },
      ]}
    >
      {/* <Box sx={{ display: 'flex', flex: 1 }}>{renderEdit}</Box> */}
      {renderEdit}
    </PageContainer>
  );
}
