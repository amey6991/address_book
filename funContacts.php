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

	function getAllContact(){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();
		
		$sTableMaster = 'app_contact_master';
		
		$sQuery = "SELECT * FROM {$sTableMaster} WHERE status=1";
		$aAllList = array();
		
		if($conn != false){
			$sSQueryR = $conn->query($sQuery);
	        if($sSQueryR!==FALSE){
	            while($aRow = $sSQueryR->fetch_assoc()){
	                $iContactID = $aRow['contact_id'];
	                $aEmail = getAllEmailForContact($iContactID);
	                $aMobile = getAllMobileForContact($iContactID);
	                $aAddress = getAllAddressForContact($iContactID);
	                $aRow['mobile']=$aMobile;
	                $aRow['email']=$aEmail;
	                $aRow['address']=$aAddress;
	                $aAllList[] = $aRow;
	            }
	        }
	    }
	    return $aAllList;
	}

	function getAllEmailForContact($iContactID){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();

		$sTableEmail = 'contact_email_master';
		
		$sQuery = "SELECT * FROM {$sTableEmail} WHERE `status`=1 AND `master_id`={$iContactID}";
		$aAllEmail = array();
		if($conn != false){
			$sSQueryR = $conn->query($sQuery);
	        if($sSQueryR!==FALSE){
	            while($aRow = $sSQueryR->fetch_assoc()){
	                $aAllEmail[]=$aRow['email'];
	            }
	        }
	    }
	    return $aAllEmail;
	}
	// function to query with filter
	function getAllEmailForContactByFilter($iContactID){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();

		$sTableEmail = 'contact_email_master';
		
		$sQuery = "SELECT * FROM {$sTableEmail} WHERE `status`=1 AND `master_id`={$iContactID} order by email asc";
		$aAllEmail = array();
		if($conn != false){
			$sSQueryR = $conn->query($sQuery);
	        if($sSQueryR!==FALSE){
	            while($aRow = $sSQueryR->fetch_assoc()){
	                $aAllEmail[]=$aRow['email'];
	            }
	        }
	    }
	    return $aAllEmail;
	}
	// function to query with filter
	function getAllMobileForContactByFilter($iContactID){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();

		$sTableMobile = 'contact_mobile_master';
		
		$sQuery = "SELECT * FROM {$sTableMobile} WHERE `status`=1 AND `master_id`={$iContactID} order by mobile asc";
		$aAllMobile = array();
		if($conn != false){
			$sSQueryR = $conn->query($sQuery);
	        if($sSQueryR!==FALSE){
	            while($aRow = $sSQueryR->fetch_assoc()){
	                $aAllMobile[]=$aRow['mobile'];
	            }
	        }
	    }
	    return $aAllMobile;
	}

	function getAllMobileForContact($iContactID){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();

		$sTableMobile = 'contact_mobile_master';
		
		$sQuery = "SELECT * FROM {$sTableMobile} WHERE `status`=1 AND `master_id`={$iContactID}";
		$aAllMobile = array();
		if($conn != false){
			$sSQueryR = $conn->query($sQuery);
	        if($sSQueryR!==FALSE){
	            while($aRow = $sSQueryR->fetch_assoc()){
	                $aAllMobile[]=$aRow['mobile'];
	            }
	        }
	    }
	    return $aAllMobile;
	}

	function getAllAddressForContact($iContactID){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();

		$sTableAddress = 'contact_address_master';
		
		$sQuery = "SELECT * FROM {$sTableAddress} WHERE `status`=1 AND `master_id`={$iContactID}";
		$aAllAddress = array();
		if($conn != false){
			$sSQueryR = $conn->query($sQuery);
	        if($sSQueryR!==FALSE){
	            while($aRow = $sSQueryR->fetch_assoc()){
	                $aAllAddress[]=$aRow['address'];
	            }
	        }
	    }
	    return $aAllAddress;

	
	}

	function getAllContactForFilter($iValue){
		$DBMan = new DBConnManager();
	    $conn =  $DBMan->getConnInstance();
		
		$sTableMaster = 'app_contact_master';
		
		if($iValue==1){
			$sQuery = "SELECT * FROM {$sTableMaster} WHERE status=1 order by contact_id asc";
		}else if($iValue==2){
			$sQuery = "SELECT * FROM {$sTableMaster} WHERE status=1 order by first_name asc";
		}else{
			$sQuery = "SELECT * FROM {$sTableMaster} WHERE status=1";
		}
		
		$aAllList = array();
		
		if($conn != false){
			$sSQueryR = $conn->query($sQuery);
	        if($sSQueryR!==FALSE){
	            while($aRow = $sSQueryR->fetch_assoc()){
	                $iContactID = $aRow['contact_id'];
	                if($iValue==3){
	                	$aMobile = getAllMobileForContactByFilter($iContactID);
	                }else{
	                	$aMobile = getAllMobileForContact($iContactID);
	                }

	                if($iValue==4){
	                	$aEmail = getAllEmailForContactByFilter($iContactID);
	                }else{
	                	$aEmail = getAllEmailForContact($iContactID);
	                }
					$aAddress = getAllAddressForContact($iContactID);
	                $aRow['mobile']=$aMobile;
	                $aRow['email']=$aEmail;
	                $aRow['address']=$aAddress;
	                $aAllList[] = $aRow;
	            }
	        }
	    }
	    return $aAllList;
	}
?>