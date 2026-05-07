<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

date_default_timezone_set('Asia/Kolkata');
include_once 'db.php';
function createResponse($status, $message, $data = [])
{
    $response =
        [
            'status' => $status,
            'message' => $message,
            'data' => $data
        ];
    return json_encode($response);
}

function validateInput($input)
{
    //SQL Injection protection
    if (preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $input)) {
        return false;
    }

    // XSS protection
    if (preg_match('/<[^>]*>/', $input)) {
        return false;
    }

    return true;
}

function mapVehicle( $row )
{
    $vehicle['id'] = $row['id'];
    $vehicle['veh_num'] = $row['veh_num'];
    $vehicle['veh_type'] = $row['veh_type'];
    $vehicle['veh_model'] = $row['veh_model'];
    $vehicle['veh_cost'] = $row['veh_cost'];
    $vehicle['area_locality'] = $row['area_locality'];
    $vehicle['gps_number'] = $row['gps_number'];
    $vehicle['veh_img'] = $row['veh_img'];
    $vehicle['is_ev'] = $row['is_ev'];
    return $vehicle;
}
$data = json_decode(file_get_contents('php://input'), true);
$add_vehicle = isset($data['add_vehicle']) ? $data['add_vehicle'] : false;
$edit_vehicle = isset($data['edit_vehicle']) ? $data['edit_vehicle'] : false;
$delete_vehicle = isset($data['delete_vehicle']) ? $data['delete_vehicle'] : false;
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data) {
        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        if (!$data || empty($data['email']) || empty($data['password'])) {
            echo createResponse('error', 'Missing required fields.', []);
            exit;
        } else {
            $password = md5($password);
            $query = "SELECT * FROM user WHERE username = '$email' OR email='$email' AND password='$password'";
            $result = mysqli_query($connection, $query);
            if (mysqli_num_rows($result) == 1) {
                $user = mysqli_fetch_assoc($result);
                session_start();
                $_SESSION['username'] = $user['username'];
                $_SESSION['user_id'] = $user['id'];
                echo createResponse('success', 'Logged in successfully.', ['username' => $_SESSION['username']]);
                exit;
            } else {
                echo createResponse('error', "Incorrect login information.", []);
                exit;
            }
        }
    }
}

// Vehicles CRUD
if (isset($_GET['vehicles'])) {
    $sql = "SELECT * FROM vehicles WHERE isActive = 1";
    $result = mysqli_query($connection, $sql);
    if (mysqli_num_rows($result)) {
        $vehicles = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $newVehicle = mapVehicle( $row );
            array_push($vehicles, $newVehicle);
        }
        $response['data'] = $vehicles;
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Vehicles Not Found";
    }
    echo json_encode($response);
}

if (isset($_GET['vehicle'])) {
    $id = $_GET['id'];
    $sql = "SELECT v.id,v.veh_num,v.veh_cost,v.area_locality,v.gps_number,v.veh_img,vt.type FROM vehicles v inner join vehicle_type vt on v.veh_type = vt.id WHERE v.id = '$id'";
    $result = mysqli_query($connection, $sql);
    if (mysqli_num_rows($result)) {
        $vehicle = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $vehicle['id'] = $row['id'];
            $vehicle['veh_num'] = $row['veh_num'];
            $vehicle['veh_type'] = $row['veh_type'];
            $vehicle['veh_model'] = $row['veh_model'];
            $vehicle['veh_cost'] = $row['veh_cost'];
            $vehicle['area_locality'] = $row['area_locality'];
            $vehicle['gps_number'] = $row['gps_number'];
            $vehicle['veh_img'] = $row['veh_img'];
            $vehicle['is_ev'] = $row['is_ev'];
        }
        $response['data'] = $vehicle;
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Vehicle Not Found";
    }
    echo json_encode($response);
}

if (isset($_GET['get_vehicle'])) {
    $veh_number = $_GET['number'];
    $sql = "SELECT v.id,v.veh_num,v.veh_cost,v.area_locality,v.gps_number,v.veh_img,vt.type FROM vehicles v inner join vehicle_type vt on v.veh_type = vt.id WHERE v.veh_num = 'veh_number'";
    $result = mysqli_query($connection, $sql);
    if (mysqli_num_rows($result)) {
        $vehicle = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $vehicle['id'] = $row['id'];
            $vehicle['veh_num'] = $row['veh_num'];
            $vehicle['veh_type'] = $row['veh_type'];
            $vehicle['veh_model'] = $row['veh_model'];
            $vehicle['veh_cost'] = $row['veh_cost'];
            $vehicle['area_locality'] = $row['area_locality'];
            $vehicle['gps_number'] = $row['gps_number'];
            $vehicle['veh_img'] = $row['veh_img'];
            $vehicle['is_ev'] = $row['is_ev'];
        }
        $response['data'] = $vehicle;
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Vehicle Not Found";
    }
    echo json_encode($response);
}

if ($add_vehicle) {
    $veh_num = $data['veh_num'];
    $veh_type = $data['veh_type'];
    $veh_model = $data['veh_model'];
    $veh_cost = $data['veh_cost'];
    $area_locality = $data['area_locality'];
    $gps_number = $data['gps_number'];
    $veh_img = $data['veh_img'];
    $is_ev = $data['is_ev'];
    $sql = "INSERT INTO vehicles( veh_num,veh_cost,veh_type,veh_model,area_locality,gps_number,veh_img,is_ev) VALUES ('$veh_num','$veh_cost','$veh_type','$veh_model','$area_locality','$gps_number','$veh_img','$is_ev')";
    $insert_result = mysqli_query($connection, $sql);

    if ($insert_result) {
        $response['data'] = $connection->insert_id;
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Error";
    }
    echo json_encode($response);
}

if ($edit_vehicle) {
    $id = (int)$data['id'];
    $veh_num = $data['veh_num'];
    $veh_type = $data['veh_type'];
    $veh_model = $data['veh_model'];
    $veh_cost = $data['veh_cost'];
    $area_locality = $data['area_locality'];
    $gps_number = $data['gps_number'];
    $veh_img = $data['veh_img'];
    $is_ev = $data['is_ev'];

    $sql = "UPDATE vehicles set veh_num = '$veh_num',veh_cost = '$veh_cost',veh_type='$veh_type',veh_model='$veh_model',area_locality='$area_locality',gps_number='$gps_number',veh_img='$veh_img',is_ev='$is_ev' WHERE id = '$id' ";
    $update_result = mysqli_query($connection, $sql);

    if ($update_result) {
        $response['data'] = "Vehicle Updated";
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Error";
    }
    echo json_encode($response);
}

if ($delete_vehicle) {
    $id = $data['id'];

    $sql = "UPDATE vehicles set isActive = 0 WHERE id = '$id' ";
    $delete_result = mysqli_query($connection, $sql);

    if ($delete_result) {
        $response['data'] = "Vehicle Deleted";
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Error";
    }
    echo json_encode($response);
}


// Locations CRUD
if (isset($_GET['locations'])) {
    $gps_number = $_GET['gps_number'];
    $sql = "SELECT * FROM locations WHERE gps_number = '$gps_number'";
    $result = mysqli_query($connection, $sql);
    if (mysqli_num_rows($result)) {
        $locations = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $location['id'] = $row['id'];
            $location['longitude'] = $row['longitude'];
            $location['latitude'] = $row['latitude'];
            $location['timestamp'] = $row['timestamp'];
            $location['speed'] = $row['speed'];
            array_push($locations, $location);
        }
        $response['data'] = $locations;
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Locations Not Found";
    }
    echo json_encode($response);
}



if (isset($_POST['add_location'])) {

    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    $speed = $_POST['speed'];
    $gps_number = $_POST['gps_number'];

    $sql = "INSERT INTO locations( gps_number,longitude,latitude,speed) VALUES ('$gps_number','$longitude','$latitude','$speed')";
    $insert_result = mysqli_query($connection, $sql);

    if ($insert_result) {
        $response['data'] = "Location Added";
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Error";
    }
    echo json_encode($response);
}

if (isset($_POST['edit_location'])) {
    $id = $_POST['id'];
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    $speed = $_POST['speed'];
    $gps_number = $_POST['gps_number'];

    $sql = "UPDATE locations set gps_number='$gps_number', longitude = '$longitude',latitude = '$latitude',speed='$speed' WHERE id = '$id' ";
    $update_result = mysqli_query($connection, $sql);

    if ($update_result) {
        $response['data'] = "Location Updated";
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Error";
    }
    echo json_encode($response);
}

if (isset($_POST['delete_location'])) {
    $id = $_POST['id'];

    $sql = "UPDATE locations set isActive = 0 WHERE id = '$id' ";
    $delete_result = mysqli_query($connection, $sql);

    if ($delete_result) {
        $response['data'] = "Location Deleted";
        $response['done'] = true;
    } else {
        $response['done'] = false;
        $response['data'] = "Error";
    }
    echo json_encode($response);
}
