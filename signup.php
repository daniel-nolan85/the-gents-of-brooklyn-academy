<?php
if ('' != htmlentities(addslashes($_POST['gbacademy']))) {
    print "Spam attempt!";
    exit;
}
$signup = htmlentities(addslashes($_POST['signup']));
header('Content-Type: application/json'); 
if ($signup === ''){
    print json_encode(array('message' => 'Email cannot be empty', 'code' => 0));
    exit();
} else {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        print json_encode(array('message' => 'Email format invalid.', 'code' => 0));
        exit();
    }
}
$content="From: $signup \nReply-to: $signup \n\n$signup has expressed an interest in our courses";
$recipient = "enquiries@thegbacademy.com";
$mailheader = "From: feedback@thegbacademy.com \r\n";
$subject = 'Expression of interest';
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'Email successfully sent!', 'code' => 1));
exit();
?> 