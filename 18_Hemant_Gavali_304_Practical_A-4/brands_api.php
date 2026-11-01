<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");

$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = "";     // Default XAMPP password
$dbname = "shop_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Handle GET request to output Brands in JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM Brand_Master";
    $result = $conn->query($sql);
    $brands = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $brands[] = $row;
        }
    }
    echo json_encode($brands);
}

// Handle POST request to insert a new Brand
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if(isset($data->Brand_Name) && isset($data->Description)) {
        $stmt = $conn->prepare("INSERT INTO Brand_Master (Brand_Name, Description) VALUES (?, ?)");
        $stmt->bind_param("ss", $data->Brand_Name, $data->Description);
        if($stmt->execute()){
            echo json_encode(["message" => "Brand added successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add brand"]);
        }
        $stmt->close();
    }
}
$conn->close();
?>