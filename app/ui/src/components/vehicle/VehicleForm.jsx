import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

function VehicleForm(props) {
  const {
    formState,
    onFieldChange,
    onSubmit,
    onReset,
    submitButtonLabel,
    backButtonPath,
  } = props;

  const formValues = formState.values;
  const formErrors = formState.errors;

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(formValues);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formValues, onSubmit],
  );

  const handleTextFieldChange = React.useCallback(
    (event) => {
      onFieldChange(event.target.name, event.target.value);
    },
    [onFieldChange],
  );

  const handleNumberFieldChange = React.useCallback(
    (event) => {
      onFieldChange(event.target.name, Number(event.target.value));
    },
    [onFieldChange],
  );

  const handleCheckboxFieldChange = React.useCallback(
    (event) => {
      onFieldChange(event.target.name, event.target.checked);
    },
    [onFieldChange],
  );

  const handleDateFieldChange = React.useCallback(
    (fieldName) => (value) => {
      if (value?.isValid()) {
        onFieldChange(fieldName, value.toISOString() ?? null);
      } else if (formValues[fieldName]) {
        onFieldChange(fieldName, null);
      }
    },
    [formValues, onFieldChange],
  );

  const handleSelectFieldChange = React.useCallback(
    (event) => {
      onFieldChange(event.target.name, event.target.value);
    },
    [onFieldChange],
  );

  const handleReset = React.useCallback(() => {
    if (onReset) {
      onReset(formValues);
    }
  }, [formValues, onReset]);

  const handleBack = React.useCallback(() => {
    navigate(backButtonPath ?? '/vehicles');
  }, [navigate, backButtonPath]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      onReset={handleReset}
      sx={{ width: '100%' }}
    >
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.veh_num ?? ''}
              onChange={handleTextFieldChange}
              name="veh_num"
              label="Vehicle Number"
              error={!!formErrors.veh_num}
              helperText={formErrors.veh_num ?? ' '}
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.veh_model ?? ''}
              onChange={handleTextFieldChange}
              name="veh_model"
              label="Vehicle Model"
              error={!!formErrors.veh_model}
              helperText={formErrors.veh_model ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.veh_cost ?? ''}
              onChange={handleTextFieldChange}
              name="veh_cost"
              label="Cost"
              error={!!formErrors.veh_cost}
              helperText={formErrors.veh_cost ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <FormControl error={!!formErrors.veh_type} fullWidth>
              <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
              <Select
                value={formValues.veh_type ?? ''}
                onChange={handleSelectFieldChange}
                labelId="vehicle-type-label"
                name="veh_type"
                label="Vehicle Type"
                defaultValue=""
                fullWidth
              >
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Truck">Truck</MenuItem>
                <MenuItem value="Bus">Bus</MenuItem>
              </Select>
              <FormHelperText>{formErrors.veh_type ?? ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.area_locality ?? ''}
              onChange={handleTextFieldChange}
              name="area_locality"
              label="Area/Locality"
              error={!!formErrors.area_locality}
              helperText={formErrors.area_locality ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.gps_number ?? ''}
              onChange={handleTextFieldChange}
              name="gps_number"
              label="GPS Number"
              error={!!formErrors.gps_number}
              helperText={formErrors.gps_number ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <TextField
              value={formValues.veh_img ?? ''}
              onChange={handleTextFieldChange}
              name="veh_img"
              label="Upload Image"
              error={!!formErrors.veh_img}
              helperText={formErrors.veh_img ?? ' '}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <FormControl>
              <FormControlLabel
                name="is_ev"
                control={
                  <Checkbox
                    size="large"
                    checked={formValues.is_ev ?? false}
                    onChange={handleCheckboxFieldChange}
                  />
                }
                label="E V"
              />

            </FormControl>
          </Grid>
        </Grid>
      </FormGroup>
      <hr />
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Button
          color="inherit"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {submitButtonLabel}
        </Button>
      </Stack>
    </Box>
  );
}

VehicleForm.propTypes = {
  backButtonPath: PropTypes.string,
  formState: PropTypes.shape({
    errors: PropTypes.shape({
      veh_number: PropTypes.string,
      veh_type: PropTypes.string,
      veh_model: PropTypes.string,
      veh_cost: PropTypes.string,
      area_locality: PropTypes.string,
      gps_number: PropTypes.string,
      veh_image: PropTypes.string,
    }).isRequired,
    values: PropTypes.shape({
      veh_number: PropTypes.string,
      veh_type: PropTypes.oneOf(['Car', 'Truck', 'Bus']),
      veh_model: PropTypes.string,
      veh_cost: PropTypes.string,
      area_locality: PropTypes.string,
      gps_number: PropTypes.string,
      veh_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  submitButtonLabel: PropTypes.string.isRequired,
};

export default VehicleForm;
