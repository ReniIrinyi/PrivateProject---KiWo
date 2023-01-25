<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

$name = $_POST["name"];
$mailFrom = $_POST["email"];
$message = $_POST["message"];

require_once "vendor/autoload.php";

$mailTo="reniirinyi@icloud.com"; 
$headers="From: Webseite der KinderWoche-Uerkental".$mailFrom;
$txt="Du hast eine neue Nachricht von".$name.".\n\n".$message;



$mail=new PHPMailer(true);
$mail->isSMTP();
$mail->SMTPAuth=true;

$mail->Host="srv19.tophost.ch";
$mail->SMTPSecure=PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port=465;

$mail->Username="anmeldung@kiwo-uerkental.ch";
$mail->Password="*************";

$mmail->setForm($email, $name);
$mail->addAddress("anmeldung@kiwo-uerkental.ch");
$mail->Subject="Neue Anmeldung auf kiwo-uerkental.ch";
$mail->Body=$message;

$mail->send();

header("Location: thanks.html");
