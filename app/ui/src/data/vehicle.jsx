import http from '../services/http-common';

export function getVehicles() {
  return http.get('vehicle')
    .then(function (response) {
      console.log(response.data);
      return response.data;
    });

}

export async function getMany({ paginationModel, filterModel, sortModel }) {
  return getVehicles().then((response) => {

    let filteredVehicles = [...response];

    // Apply filters (example only)
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        filteredVehicles = filteredVehicles.filter((vehicle) => {
          const vehicleValue = vehicle[field];

          switch (operator) {
            case 'contains':
              return String(vehicleValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case 'equals':
              return vehicleValue === value;
            case 'startsWith':
              return String(vehicleValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case 'endsWith':
              return String(vehicleValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            case '>':
              return vehicleValue > value;
            case '<':
              return vehicleValue < value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      filteredVehicles.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field] < b[field]) {
            return sort === 'asc' ? -1 : 1;
          }
          if (a[field] > b[field]) {
            return sort === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedVehicles = filteredVehicles.slice(start, end);

    return {
      items: paginatedVehicles,
      itemCount: filteredVehicles.length,
    };
  });
}

export async function getOne(vehicleId) {
  return http.get(`vehicle/${Number(vehicleId)}`).then(function (response) {
    console.log(response.data);
    return response.data;
  })
}

export async function createOne(data) {
  await http.post(`vehicle/save`, data);
  
}

export async function updateOne(vehicleId, data) {
  return http.post(`vehicle/${vehicleId}/edit`, data).then(function (response) {
    console.log(response.data);
    return response.data;
  });

}

export async function deleteOne(vehicleId) {
  return http.delete(`vehicle/${vehicleId}/delete`).then(function (response) {
    console.log(response.data);
    return response.data;
  });
}

// Validation follows the [Standard Schema](https://standardschema.dev/).

export function validate(vehicle) {
  let issues = [];

  if (!vehicle.veh_num) {
    issues = [...issues, { message: 'Number is required', path: ['veh_num'] }];
  }

  if (!vehicle.veh_type) {
    issues = [...issues, { message: 'Type is required', path: ['veh_type'] }];
  }

  if (!vehicle.veh_model) {
    issues = [...issues, { message: 'Model is required', path: ['veh_model'] }];
  }

  if (!vehicle.veh_cost) {
    issues = [...issues, { message: 'Cost is required', path: ['veh_cost'] }];
  }

  if (!vehicle.area_locality) {
    issues = [...issues, { message: 'Area is required', path: ['area_locality'] }];
  }

  // if (!vehicle.is_ev) {
  //   issues = [...issues, { message: 'Is EV is required', path: ['is_ev'] }];
  // }

  if (!vehicle.gps_number) {
    issues = [...issues, { message: 'GPS Number is required', path: ['gps_number'] }];
  }

  if (!vehicle.veh_img) {
    issues = [...issues, { message: 'Image is required', path: ['veh_img'] }];
  }


  return { issues };
}
