<?php
require('BCGDrawing.php');
require('BCGcode39.barcode.php');
 
$color_black = new BCGColor(0, 0, 0);
$color_white = new BCGColor(255, 255, 255);
 
// Barcode Part
$oCode39 = new BCGcode39();
$oCode39->setScale(2);
$oCode39->setThickness(30);
$oCode39->setForegroundColor($color_black);
$oCode39->setBackgroundColor($color_white);
//$code->setFont($font);
$oCode39->setChecksum(false);
$oCode39->parse('123456789');
 
// Drawing Part
$oDrawing = new BCGDrawing('', $color_white);
$oDrawing->setBarcode($oCode39);
$oDrawing->draw();
 
header('Content-Type: image/png');
 
$oDrawing->finish(BCGDrawing::IMG_FORMAT_PNG);
?>