<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
date_default_timezone_set('Asia/Kolkata');
include_once './../DbConnect.php';
include_once './../Util.php';
$conn = new DbConnect();
$db = $conn->connect();
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';
        if (!$data || empty($data['email']) || empty($data['password'])) {
            echo createResponse('error', 'Missing required fields.', []);
            exit;
        } else {
            $password = md5($password);
            $sql = "SELECT * FROM user WHERE username = :username OR email= :username AND password = :password";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':username', $email);
            $stmt->bindParam(':password', $password);
            if ($stmt->execute()) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
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
