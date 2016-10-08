<?php
//! Include configEhr.php file for constant variable values.
include_once dirname(__FILE__)."/../../config/configEhr.php";
include_once ABS_PATH_TO_EHR."classes/class.DBConnManager.php";

$aFileTypes = array();
$aFileTypes['image'] = array(".jpg", ".jpeg", ".gif", ".png");
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

$iCkFuncNum = $_REQUEST['CKEditorFuncNum'];

$urlToUploader = SITE_URL."lib/uploader/";


$file = $_FILES['upload'];

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

if(!file_exists($targeDir)) {
	mkdir($targeDir);
	chmod($targeDir, 777);
}

$sFileName = $file['name'];

$sUniqueFileName = getUniqueFileName($sFileName, $targeDir);

$targeFile = $targeDir.$sUniqueFileName;

if(move_uploaded_file($file['tmp_name'], $targeFile)) {
	$url = $urlToUploader . $targeFile;

	$sCurrDate = date('Y-m-d H:i:s');

	$DBMan = new DBConnManager();
    $conn =  $DBMan->getConnInstance();
    $sTableName = DATABASE_TABLE_PREFIX.'_media_library';
    $sQuery = "INSERT INTO {$sTableName} (`id`, `file_name`, `url`, `dir`, `size`, `content_type`, `media_type`, `added_on`, `added_by`, `uploaded`, `valid`) 
    	VALUES (NULL, '{$sUniqueFileName}', '{$url}', '{$sSubDir}', '{$file['size']}', '{$file['type']}', '{$mediaType}', '{$sCurrDate}', '0', '1', '1');";

    $rResult = $conn->query($sQuery);

	?><html>
<body>
<script type='text/javascript'>
window.parent.CKEDITOR.tools.callFunction(<?php echo $iCkFuncNum?>, '<?php echo $url; ?>');
    </script>
</body>
</html>
	<?php
}
else {
	?>
	<html>
<body>
<script type='text/javascript'>
window.parent.CKEDITOR.tools.callFunction(<?php echo $iCkFuncNum?>, "", "There was some problem uploading the file.");
    </script>
</body>
</html>
<?php
}

?>