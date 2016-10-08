<?php
ob_start();
//! Include configEhr.php file for constant variable values.
include_once dirname(__FILE__)."/../../config/configEhr.php";
include_once ABS_PATH_TO_EHR."classes/class.DBConnManager.php";
include_once ABS_PATH_TO_EHR."sessionCheck.php";


$aFileTypes = array();
$aFileTypes['image'] = array(".jpg", ".jpeg", ".gif", ".png", ".bmp");
$aFileTypes['flash'] = array(".swf");
$aFileTypes['video'] = array(".mov", ".avi", ".mp4", ".3gp", ".flv");
$aFileTypes['file'] = array(".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt");

function isImage($file) {
	global $aFileTypes;
	
	$sFileName = $file['name'];
	$sExploded = explode(".", $sFileName);
	$sExt = ".".strtolower(array_pop($sExploded));

	if(in_array($sExt, $aFileTypes['image'])) {
		return true;
	}
	else {
		return false;
	}

}

function isFlash($file) {
	global $aFileTypes;
	$sFileName = $file['name'];
	$sExploded = explode(".", $sFileName);
	$sExt = ".".strtolower(array_pop($sExploded));

	if(in_array($sExt, $aFileTypes['flash'])) {
		return true;
	}
	else {
		return false;
	}

}

function isVideo($file) {
	global $aFileTypes;
	$sFileName = $file['name'];
	$sExploded = explode(".", $sFileName);
	$sExt = ".".strtolower(array_pop($sExploded));

	if(in_array($sExt, $aFileTypes['video'])) {
		return true;
	}
	else {
		return false;
	}

}

function isFile($file) {
	global $aFileTypes;
	$sFileName = $file['name'];
	$sExploded = explode(".", $sFileName);
	$sExt = ".".strtolower(array_pop($sExploded));

	if(in_array($sExt, $aFileTypes['file'])) {
		return true;
	}
	else {
		return false;
	}

}


function getUniqueFileName($sFileName, $targeDir) {
	if(!file_exists($targeDir.$sFileName)) {
		return $sFileName;
	}
	$ii = 1;

	$sExploded = explode(".", $sFileName);
	$sExt = array_pop($sExploded);
	$sFile = implode(".", $sExploded);

	while(file_exists($targeDir.$sFile.' ('.$ii.').'.$sExt)) {
		$ii++;
	}
	return $sFile.' ('.$ii.').'.$sExt;
}

function fetchAndStore($sURL, $localPath) {
	$ch = curl_init($sURL);
	$fp = fopen(trim($localPath), 'wb');
	curl_setopt($ch, CURLOPT_FILE, $fp);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);     
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
	curl_exec($ch);
	$info = curl_getinfo($ch);
	curl_close($ch);
	fclose($fp);

	return $info;
}

$sURL = $_POST['url'];

$iUserID = $sessionManager->iUserID;

$urlToUploader = SITE_URL."lib/uploader/";

$sFileName = trim(array_pop(explode("/", $sURL)));

$sFileName = explode("?", $sFileName);
$sFileName = $sFileName[0];

$file['name'] = $sFileName;

$uploadDir = "contents/";

$sSubDir = "files/";

$mediaType = "other";

if(isImage($file)) {
	$sSubDir = "images/";
	$mediaType = "image";
}
else if(isFlash($file)) {
	$sSubDir = "flash/";
	$mediaType = "flash";
}
else if(isVideo($file)) {
	$sSubDir = "videos/";
	$mediaType = "video";
}
else if(isFile($file)) {
	$sSubDir = "files/";
	$mediaType = "file";
}

$targeDir = $uploadDir.$sSubDir;

$sUniqueFileName = getUniqueFileName($file['name'], $targeDir);

$targeFile = $targeDir.$sUniqueFileName;

$uploadInfo = fetchAndStore($sURL, $targeFile);

$file['size'] = $uploadInfo['download_content_length'];
$file['type'] = $uploadInfo['content_type'];

	$url = $urlToUploader . $targeFile;

	$sCurrDate = date('Y-m-d H:i:s');

	$DBMan = new DBConnManager();
    $conn =  $DBMan->getConnInstance();
    $sTableName = DATABASE_TABLE_PREFIX.'_media_library';
    $sQuery = "INSERT INTO {$sTableName} (`id`, `file_name`, `url`, `dir`, `size`, `content_type`, `media_type`, `added_on`, `added_by`, `uploaded`, `valid`) 
    	VALUES (NULL, '{$sUniqueFileName}', '{$url}', '{$sSubDir}', '{$file['size']}', '{$file['type']}', '{$mediaType}', '{$sCurrDate}', '{$iUserID}', '1', '1');";

    $rResult = $conn->query($sQuery);

ob_clean();
echo json_encode($url);
ob_flush();
?>