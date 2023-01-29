<?php

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$name = $_POST["name"];
$mailFrom = $_POST["email"];
$message = $_POST["message"];

$mailTo = "reniirinyi@icloud.com"; 
$headers = "From: Webseite der KinderWoche-Uerkental" . $mailFrom;
$txt = "Du hast eine neue Nachricht von" . $name . ".\n\n" . $message;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->Host="srv19.tophost.ch";
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
$mail->Username="anmeldung@kiwo-uerkental.ch";
$mail->Password="KiWoUerke12345!";

$mail->setFrom("anmeldung@kiwo-uerkental.ch", "anmeldung");
//$mail->addAddress("anmeldung@kiwo-uerkental.ch");
$mail->addAddress("leczaist@gmail.com");
$mail->Subject = "Neue Anmeldung auf kiwo-uerkental.ch";
$mail->Body = $txt;

$mail->send();

header("Loaction: thanks.html");
