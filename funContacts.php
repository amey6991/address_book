<?php
	include_once 'config/config.database.php';
	include_once 'classes/class.DBConnManager.php';

	function addContactMaster($sFirstName,$sLastName,$sState,$sCity){

	    $iContactID = 0;
	    $DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();
	    
	    $sTable = 'app_contact_master';
	   	$sIQuery = "INSERT INTO `{$sTable}` (`contact_id`,`first_name`,`last_name`,`state`,`city`,`added_on`,`status`)
	                VALUES (NULL, '{$sFirstName}', '{$sLastName}', '{$sState}', '{$sCity}', CURRENT_TIMESTAMP, 1)";

	    if($conn != false){
			$sIQueryR = $conn->query($sIQuery);
	        if($sIQueryR > 0){
	            $iContactID = $conn->insert_id;
	        }
		}

	    return $iContactID;
	}

	function addContactEmail($iContactID,$sEmailJSON){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();
	    
	    $sTable = 'contact_email_master';
	    $aEmail = json_decode($sEmailJSON);
	    if(!empty($aEmail)){
	    	foreach ($aEmail as $key => $value) {
	    		$sIQuery = "INSERT INTO `{$sTable}` (`id`,`master_id`,`email`,`status`)
	                VALUES (NULL, '{$iContactID}', '{$value}', 1)";
	            if($conn != false){
					$sIQueryR = $conn->query($sIQuery);
			        if($sIQueryR > 0){
			            $iContactID = $conn->insert_id;
			        }
				}  
	    	}
	    }
	}

	function addContactMobile($iContactID,$sMobileJSON){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();
	    
	    $sTable = 'contact_mobile_master';
	    $aMobile = json_decode($sMobileJSON);
	    if(!empty($aMobile)){
	    	foreach ($aMobile as $key => $value) {
	    		$sIQuery = "INSERT INTO `{$sTable}` (`id`,`master_id`,`mobile`,`status`)
	                VALUES (NULL, '{$iContactID}', '{$value}', 1)";
	            if($conn != false){
					$sIQueryR = $conn->query($sIQuery);
			        if($sIQueryR > 0){
			            $iContactID = $conn->insert_id;
			        }
				}  
	    	}
	    }
	}

	function addContactAddress($iContactID,$sAddressJSON){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();
	    
	    $sTable = 'contact_address_master';
	    $aAddress = json_decode($sAddressJSON);
	    if(!empty($aAddress)){
	    	foreach ($aAddress as $key => $value) {
	    		$sIQuery = "INSERT INTO `{$sTable}` (`id`,`master_id`,`address`,`status`)
	                VALUES (NULL, '{$iContactID}', '{$value}', 1)";
	            if($conn != false){
					$sIQueryR = $conn->query($sIQuery);
			        if($sIQueryR > 0){
			            $iContactID = $conn->insert_id;
			        }
				}  
	    	}
	    }
	}
?>