<?php
require('BCGDrawing.php');
require('BCGcode128.barcode.php');
 
$sColorBlack = new BCGColor(0, 0, 0);
$sColorWhite = new BCGColor(255, 255, 255);
 
//! Generate Barcode Part...
$oCode128 = new BCGcode128();
$oCode128->setScale(2);
$oCode128->setThickness(30);
$oCode128->setStart(NULL);
$oCode128->setTilde(true);
$oCode128->parse('123456789');
 
//! Drawing Part barcode part...
$oDrawing = new BCGDrawing('', $sColorWhite);
$oDrawing->setBarcode($oCode128);
$oDrawing->draw();
 
header('Content-Type: image/png');
 
$oDrawing->finish(BCGDrawing::IMG_FORMAT_JPEG);
?>