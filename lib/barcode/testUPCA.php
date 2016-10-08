<?php
//require('class/BCGFontFile.php');
//require('class/BCGColor.php');
require('BCGDrawing.php');
require('BCGupca.barcode.php');
 
//$font = new BCGFontFile('./class/font/Arial.ttf', 18);
$color_black = new BCGColor(0, 0, 0);
$color_white = new BCGColor(255, 255, 255);
 
// Barcode Part
$code = new BCGupca();
$code->setScale(2);
$code->setThickness(30);
$code->setForegroundColor($color_black);
$code->setBackgroundColor($color_white);
//$code->setFont($font);
$code->parse('78951545548');
 
// Drawing Part
$drawing = new BCGDrawing('', $color_white);
$drawing->setBarcode($code);
$drawing->draw();
 
header('Content-Type: image/png');
 
$drawing->finish(BCGDrawing::IMG_FORMAT_PNG);
?>