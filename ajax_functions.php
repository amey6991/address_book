<?php
	include_once 'funContacts.php';

	$sFlag = $_GET['sFlag'];

	if($sFlag=='addContactMaster'){
		$sFirstName = $_GET['sFirstName'];
		$sLastName = $_GET['sLastName'];
		$sState = $_GET['sState'];
		$sCity = $_GET['sCity'];
		$sEmailJSON = $_GET['sEmailJSON'];
		$sMobileJSON = $_GET['sMobileJSON'];
		$sAddressJSON = $_GET['sAddressJSON'];

		$iContactID = addContactMaster($sFirstName,$sLastName,$sState,$sCity);
		if($iContactID > 0){
			addContactEmail($iContactID,$sEmailJSON);
			addContactMobile($iContactID,$sMobileJSON);
			addContactAddress($iContactID,$sAddressJSON);
			echo  true;
		}else{
			echo false;
		}
	}
?>