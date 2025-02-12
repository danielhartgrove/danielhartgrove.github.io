<?php

// 1. Database Connection (Adapt to your database credentials)
$servername = ""; // e.g., localhost
$username = "";
$password = "";
$dbname = "";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Handle connection error
}

session_start(); // Start the session (if not already started)

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $data = json_decode(file_get_contents("php://input"), true);
    echo 'fuck';

    // 3. Server-Side Validation and Sanitization (CRITICAL)
    $name = htmlspecialchars(trim($data['name'])); // Sanitize and trim whitespace
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL); // Sanitize email
    $phone = preg_replace("/[^0-9]/", "", $data['phone']); // Sanitize phone (numbers only)
    $organization = htmlspecialchars(trim($data['organisation'])); // Sanitize and trim
    $service = htmlspecialchars(trim($data['service'])); // Sanitize and trim
    $timeline = htmlspecialchars(trim($data['timeline'])); // Sanitize and trim
    $budget = htmlspecialchars(trim($data['budget'])); // Sanitize and trim
    $message = htmlspecialchars(trim($data['message'])); // Sanitize and trim

    // Additional validation checks (e.g., required fields, email format)
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($service)) {
        http_response_code(400); // Bad Request
        echo json_encode(["error" => "Invalid or missing input."]);
        exit;
    }


    // 4. Store Data in Database (Example)
    $sql = "INSERT INTO contact_form (name, email, phone, organization, service, timeline, budget, message) 
            VALUES ('$name', '$email', '$phone', '$organization', '$service', '$timeline', '$budget', '$message')";

    if ($conn->query($sql) === TRUE) {
        // 5. Send JSON Success Response
        header('Content-Type: application/json');
        echo json_encode(["message" => "Message sent successfully!"]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(["error" => "Error storing message: " . $conn->error]);
    }

}

$conn->close(); // Close the database connection

?>