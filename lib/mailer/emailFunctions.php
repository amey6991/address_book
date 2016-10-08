<?php

require_once "PHPMailer/class.phpmailer.php";
require_once "PHPMailer/class.smtp.php";

function fMailer($sSubject,$sBody,$sEmailTo,$sEmailName,$sAttachement,$aEmbeddedImage,$sFromEmailId,$FromEmailName){

	$oEmail             = new PHPMailer(); //! Made a object of PHPMailer class
  
	$oEmail->IsSMTP();
    $oEmail->SMTPAuth   = true;                  // enable SMTP authentication
    
    /*$oEmail->SMTPSecure = "ssl";                 // sets the prefix to the servier
    $oEmail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
    $oEmail->Port       = 465;                   // set the SMTP port
    $oEmail->Username   = "plus91.tech@gmail.com";  // GMAIL username
    $oEmail->Password   = "plus@91.in";            // GMAIL password
	*/

    //! amazonaws Email Configuration
	$oEmail->SMTPSecure = "tls";
	$oEmail->Host  = "email-smtp.us-west-2.amazonaws.com";
	$oEmail->Port = 587;
	$oEmail->Username   = "AKIAISEII6UDJTN4XTHQ";  // username
	$oEmail->Password   = "AuXuzLTaK+1t75MFsXb2NVMmgjFh5JEcAWPuQ1TdA/RE"; //  password
	//! END 
	
	$oEmail->From       = $sFromEmailId;
	$oEmail->FromName   = $FromEmailName;
	$oEmail->Subject    = $sSubject;       //sub
	$oEmail->Body       = $sBody;  //body

	$oEmail->Priority   = 3;

	//! Attached one or Multiple files
	if($sAttachement != ''){

		$aAttachment = explode(",",$sAttachement);
		$iAttachmentcount = count($aAttachment);

	}else{
		
		$iAttachmentcount = 0;
	}

	if($iAttachmentcount == 1){

		$fileNameToAttach = trim($aAttachment[0]);
		$oEmail->AddAttachment($fileNameToAttach);
	}

	if($iAttachmentcount > 1){

		for($iii=0;$iii<count($aAttachment);$iii++){
	
			$oEmail->AddAttachment(trim($aAttachment[$iii]));
		}
	}

	
	//! Attached embedded images to the mail
	if(!empty($aEmbeddedImage)){
		
		$iEmbeddedCount = count($aEmbeddedImage);

		for($ppp=0;$ppp<$iEmbeddedCount;$ppp++){

			$oEmail->AddEmbeddedImage(trim($aEmbeddedImage[$ppp]['filePath'],$aEmbeddedImage[$ppp]['CID'],$aEmbeddedImage[$ppp]['fileName']));
		}
	}

	//print_r("<pre>");print_r($aEmbeddedImage);exit();

	//! Pass Recipient details
	$aEmailTo = explode(",",$sEmailTo);
	$aEmailName = explode(",",$sEmailName);

	for($iii=0;$iii<count($aEmailTo);$iii++){
		
		$oEmail->AddAddress($aEmailTo[$iii],$aEmailName[$iii]); //tomail, toname
	}

	$oEmail->IsHTML(true); // send as HTML

	if(!$oEmail->Send()) {
		$sEmailExcpetionMessage=$oEmail->ErrorInfo;
		$iSendinStatus = 1; //with error

	} else {
		$sEmailExcpetionMessage="No Error on Sending Email.";
		$iSendinStatus = 0; //without error
	}
	$aStatus=array($iSendinStatus,$sEmailExcpetionMessage);
	return $aStatus;
}
?>