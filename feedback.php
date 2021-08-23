<?php
$name=$_POST['name'];
$mail=$_POST['mail'];
$number=$_POST['number'];
$message=$_POST['message'];

//databse connection

$conn=new mysqli('localhost','root','','feedback');
if($conn->connect_error)
{
    die('Connection failed:'.$conn->connect_error);
}
else{
    $stmt=$conn->prepare("insert into resonse values(?,?,?,?)");
    $stmt->bind_param("ssss",$name,$mail,$number,$message);
    $stmt->execute();
    echo "Data submitted";
}

?>