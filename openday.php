<?php
if ('' != htmlentities(addslashes($_POST['gbacademy']))) {
    print "Spam attempt!";
    exit;
}
$openday = htmlentities(addslashes($_POST['openday']));
header('Content-Type: application/json'); 
if ($openday === ''){
    print json_encode(array('message' => 'Name cannot be empty', 'code' => 0));
    exit();
}
$content="From: $openday \n\n$openday has registered for our workshop";
$recipient = "enquiries@thegbacademy.com";
$mailheader = "From: feedback@thegbacademy.com \r\n";
$subject = 'Open day submission';
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'Email successfully sent!', 'code' => 1));
exit();
?> 