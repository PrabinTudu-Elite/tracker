<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

date_default_timezone_set('Asia/Kolkata');
include_once './../DbConnect.php';
include_once './../Util.php';
$conn = new DbConnect();
$db = $conn->connect();
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $sql = '';
        $message = "Record created successfully";
        $vehicle = json_decode(file_get_contents('php://input'));
        if (isset($vehicle->id)) {
            $sql = "UPDATE vehicles SET veh_num= :veh_num, veh_type =:veh_type, veh_model =:veh_model, veh_cost =:veh_cost, area_locality =:area_locality, gps_number =:gps_number, veh_img =:veh_img, is_ev =:is_ev WHERE id = :id";
            $message = "Record updated successfully";
        } else {
            $sql = "INSERT INTO vehicles(veh_num, veh_type, veh_model, veh_cost, area_locality, gps_number, veh_img, is_ev) values(:veh_num, :veh_type, :veh_model, :veh_cost, :area_locality, :gps_number, :veh_img, :is_ev)";
        }
        $stmt = $db->prepare($sql);
        if (isset($vehicle->id)) {
            $stmt->bindParam(':id', $vehicle->id);
        }
        $stmt->bindParam(':veh_num', $vehicle->veh_num);
        $stmt->bindParam(':veh_type', $vehicle->veh_type);
        $stmt->bindParam(':veh_model', $vehicle->veh_model);
        $stmt->bindParam(':veh_cost', $vehicle->veh_cost);
        $stmt->bindParam(':area_locality', $vehicle->area_locality);
        $stmt->bindParam(':gps_number', $vehicle->gps_number);
        $stmt->bindParam(':veh_img', $vehicle->veh_img);
        $stmt->bindParam(':is_ev', $vehicle->is_ev);
        if ($stmt->execute()) {
            $data = ['status' => 1, 'message' => $message];
        } else {
            $data = ['status' => 0, 'message' => "Error while performing operation."];
        }
        echo json_encode($data);
        break;

    case "GET":
        $sql = "SELECT * FROM vehicles";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[5]) && is_numeric($path[5])) {
            $sql .= " WHERE id = :id";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $sql .= " WHERE isActive = 1";
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;

    case "PUT":
        $vehicle = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE vehicles SET veh_num= :veh_num, veh_type =:veh_type, veh_model =:veh_model, veh_cost =:veh_cost, area_locality =:area_locality, gps_number =:gps_number, veh_img =:veh_img, is_ev =:is_ev WHERE id = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $vehicle->id);
        $stmt->bindParam(':veh_num', $vehicle->veh_num);
        $stmt->bindParam(':veh_type', $vehicle->veh_type);
        $stmt->bindParam(':veh_model', $vehicle->veh_model);
        $stmt->bindParam(':veh_cost', $vehicle->veh_cost);
        $stmt->bindParam(':area_locality', $vehicle->area_locality);
        $stmt->bindParam(':gps_number', $vehicle->gps_number);
        $stmt->bindParam(':veh_img', $vehicle->veh_img);
        $stmt->bindParam(':is_ev', $vehicle->is_ev);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "UPDATE vehicles SET isActive= 0 WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $path[5]);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
}
