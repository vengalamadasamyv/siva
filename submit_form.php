<?php
// -------------- EMAIL RECEIVER -----------------
$admin_email = "yourmail@example.com";


// -------------- GET POST DATA -------------------
$fname   = htmlspecialchars($_POST["fname"]);
$lname   = htmlspecialchars($_POST["lname"]);
$email   = htmlspecialchars($_POST["email"]);
$message = htmlspecialchars($_POST["message"]);


// ---------------- EMAIL SEND -------------------
$subject = "New Contact Form Message";
$body = "
Name: $fname $lname
Email: $email

Message:
$message
";

$headers = "From: $email";

mail($admin_email, $subject, $body, $headers);


// ---------------- OPTIONAL DATABASE SAVE -------------------
// Uncomment if you want DB storage

/*
include "db.php";

$stmt = $conn->prepare("INSERT INTO contact_form (fname, lname, email, message)
VALUES (?,?,?,?)");

$stmt->bind_param("ssss", $fname, $lname, $email, $message);
$stmt->execute();
$stmt->close();
*/


echo "<span style='color:green'>Message sent successfully!</span>";
?>
