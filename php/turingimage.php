<?php
  if (!defined('E_STRICT')) define('E_STRICT', 2048);
  if (!defined('E_RECOVERABLE_ERROR')) define('E_RECOVERABLE_ERROR', 4096);
  if (!defined('E_DEPRECATED')) define('E_DEPRECATED', 8192);
  if (!defined('E_USER_DEPRECATED')) define('E_USER_DEPRECATED', 16384);
  @error_reporting (E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_USER_DEPRECATED);
  session_start();
  $validchars  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // Generate a random code word
  $turingcode="";
  for ($k=0;$k<5;$k++)
    $turingcode.=substr($validchars,mt_rand(0,25),1);
  if ($_SESSION['ses_llurlturingcode']!="")
    $_SESSION['ses_llurlpreviousturingcode']=$_SESSION['ses_llurlturingcode'];  
  $_SESSION['ses_llurlturingcode']=$turingcode;  
  // Choose a random background image  
  $bg=mt_rand(1,4);
  $image = imagecreatefromjpeg("turingbg$bg.jpg");
  // Select black text
  $txtcolor = imagecolorallocate ($image, 0, 0, 0);
  // Add text to background
  imagestring ($image, 5, 5, 8,  $turingcode, $txtcolor);
  // Send image to browser
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
  header("Cache-Control: no-store, no-cache, must-revalidate");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  header('Content-type: image/jpeg');
  imagejpeg($image);
  imagedestroy($image);
?>
