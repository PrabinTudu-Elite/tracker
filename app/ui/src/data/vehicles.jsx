// import vehicleService from "../services/vehicle.service";
import axios from "axios";
const INITIAL_VEHICLES_STORE = [
  {
    id: 1,
    veh_num: 'OD02BV6727',
    veh_type: 'Car',
    veh_model: 'Toyota Glanza',
    veh_cost: '9,00,000.00',
    area_locality: 'Tomando, Bhubaneswar, Odisha - 751023',
    gps_number: 'GPS_001',
    is_ev: false,
    veh_img: './Uploads/OD02BV6727.jpg'
  },
  {
    id: 2,
    veh_num: 'OD18AB6138',
    veh_type: 'Car',
    veh_model: 'Suzuki Ertiga',
    veh_cost: '12,00,000.00',
    area_locality: 'Seriguda, Rayagada, Odisha - 765002',
    gps_number: 'GPS_002',
    is_ev: true,
    veh_img: './Uploads/OD18AB6138.jpg'
  },
  {
    id: 3,
    veh_num: 'OD02BV6726',
    veh_type: 'Truck',
    veh_model: 'Ashok Leyland',
    veh_cost: '14,00,000.00',
    area_locality: 'Gandhi Nagar, Kendhujhar, Odisha - 743322',
    gps_number: 'GPS_003',
    is_ev: false,
    veh_img: './Uploads/OD02BV6726.jpeg'
  },
  {
    id: 4,
    veh_num: 'OD11AB6138',
    veh_type: 'Bus',
    veh_model: 'Tata Benz',
    veh_cost: '21,00,000.00',
    area_locality: 'Nehru Nagar, Koraput, Odisha - 721123',
    gps_number: 'GPS_004',
    is_ev: false,
    veh_img: './Uploads/OD11AB6138.jpg'
  },
  {
    id: 5,
    veh_num: 'OD21AX8911',
    veh_type: 'Bus',
    veh_model: 'Ashok Leyland EV',
    veh_cost: '45,00,000.00',
    area_locality: 'Puriaput, Baleshore, Odisha - 743323',
    gps_number: 'GPS_005',
    is_ev: true,
    veh_img: './Uploads/OD21AX8911.jpg'
  }
];

var VEHICLE_STORE = [];
localStorage.setItem('vehicles-store', JSON.stringify(INITIAL_VEHICLES_STORE));
export function getVehiclesStore() {
  var vehicleStore = JSON.parse(localStorage.getItem('vehicles-store'));
  return vehicleStore;
}

export function setVehiclesStore(vehicles) {
  return localStorage.setItem('vehicles-store', JSON.stringify(INITIAL_VEHICLES_STORE));
}

export async function getMany({ paginationModel, filterModel, sortModel }) {
  var vehicleStore = getVehiclesStore();

  let filteredVehicles = [...vehicleStore];

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
}

export async function getOne(vehicleId) {
  var vehicleStore = getVehiclesStore();


  const vehicleToShow = vehiclesStore.find(
    (vehicle) => vehicle.id === vehicleId,
  );

  if (!vehicleToShow) {
    throw new Error('Vehicle not found');
  }
  return vehicleToShow;
}

export async function createOne(data) {
  var vehicleStore = getVehiclesStore();
  var newId = vehicleStore.create(data);
  const newVehicle = {
    id: newId,
    ...data,
  };
  return newVehicle;
}

export async function updateOne(vehicleId, data) {
    var vehicleStore = getVehiclesStore();
  var updated = vehicleStore.update(vehicleId, data);
  if (updated.data.done) {
    return updateVehicle;
  }
}

export async function deleteOne(vehicleId) {
  var deleted = await vehicleService.delete(vehicleId);
  if (deleted.data.done) {
    return true;
  }
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

  if (!vehicle.is_ev) {
    issues = [...issues, { message: 'Is EV is required', path: ['is_ev'] }];
  }

  if (!vehicle.gps_number) {
    issues = [...issues, { message: 'GPS Number is required', path: ['gps_number'] }];
  }

  if (!vehicle.veh_img) {
    issues = [...issues, { message: 'Image is required', path: ['veh_img'] }];
  }


  return { issues };
}
