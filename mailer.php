<?php
if(isset($_POST["submit"])){

  $name = $_POST["name"];
  $mailFrom = $_POST["email"];
  $telefon = $_POST["telefon"];
  $message = $_POST["message"];

  $mailTo="reniirinyi@icloud.com"; 
  $headers="From: Webseite der KinderWoche-Uerkental".$mailFrom;
  $txt="Du hast eine neue Nachricht von".$name.".\n\n".$message;


  mail($mailTo, $email, $message, $headers);
  header("Loaction: index.html");
}









// $mail=new PHPMailer(true);
// $mail->isSMTP();
// $mail->SMTPAuth=true;

// $mail->Host="srv19.tophost.ch";
// $mail->SMTPSecure=PHPMailer::ENCRYPTION_STARTTLS;
// $mail->Port=993;

// $mail->Username="anmeldung@kiwo-uerkental.ch";
// $mail->Password="KiWoUerke12345!";

// $mmail->setForm($email, $name);
// $mail->addAddress("anmeldung@kiwo-uerkental.ch");
// $mail->Subject="Neue Anmeldung auf kiwo-uerkental.ch";
// $mail->Body=$message;

// $mail->send();


