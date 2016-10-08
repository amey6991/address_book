<?php
//! Include configEhr.php file for constant variable values.
include_once dirname(__FILE__)."/../../config/configEhr.php";
include_once ABS_PATH_TO_EHR."classes/class.DBConnManager.php";

$sPageTopTitle = "Browes Image";
$iCkFuncNum = $_REQUEST['CKEditorFuncNum'];

if(isset($_GET['dir'])) {
	$dir = $_GET['dir'];
}
else {
	$dir = '%';
}

$DBMan = new DBConnManager();
$conn =  $DBMan->getConnInstance();
$sTableName = DATABASE_TABLE_PREFIX.'_media_library';

$sQuery = "SELECT id, file_name, url, dir, size, added_on FROM {$sTableName} WHERE valid=1 AND dir LIKE '{$dir}' ";

$rResult = $conn->query($sQuery);

$aContents = array();

if($rResult) {
	while($row = $rResult->fetch_array()) {
		$aContents[] = $row;
	}
}

$iRows = ceil(count($aContents)/5);

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>MediXcel : <?php echo $sPageTopTitle?></title>
		
		<script type="text/javascript">
		function showLoading() {
			$('#idLoaderDiv').show();
		}

		function hideLoading() {
			$('#idLoaderDiv').hide();
		}
		</script>

		<style type="text/css">
			
			.classBrowser li {
				cursor: pointer;
				height: 200px;
				width: 150px;
				overflow: hidden;
				padding: 5px;
				border: 1px solid #efefef;
				text-align: center;
				display: inline-block;
				float: left;
				margin-right: 5px;
			}

			.classBrowser li .classImgContainer {
				height: 100px;
				margin: 0;
				margin-bottom: 5px;
			}


			.classBrowser li .classImgContainer img{
				max-height: 100px;
				max-width: 100px;
			}


			.classSelectable li.ui-selected {
				background-color: #dedede;
			}



		</style>

	</head>
	<body>
		<div class="navbar">
			<div class="navbar-inner">
				<div class="container-fluid">
					<a href="" class="brand classBrand"><?php echo CONFIG_BRAND_NAME; ?></a>
					<h4 class="pull-right">Media Gallery</h4>	
				</div>

			</div>		
		</div>
		<div class="container-fluid">
			

			<div class='classAlert classWarning alert alert-info fade in'>
				Double Click the content to select.
				<a class="close" data-dismiss="alert" href="#">&times;</a>
			</div><br />
			<div class='row-fluid'>
				<div class="span12">
					<?php
					$redTo = urlencode($_SERVER['REQUEST_URI']);
					?>
					<a href="uploadForm.php?redTo=<?php echo $redTo; ?>" class="btn btn-success pull-right">Upload</a>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12">
					<?php
					$iTotalContent = count($aContents);
					$iContentCounter = 0;
					echo '<ul class=" classBrowser classSelectable">';
					
					for($jjj=0; $jjj< $iTotalContent ; $jjj++) {
						?>
						<li class="">
							<div class="classDblclickArea">
								<?php
								if($aContents[$jjj]['dir']=="images/") {
									$thumbUrl =  $aContents[$jjj]['url']; 
								}
								else if($aContents[$jjj]['dir']=="videos/") {
									$thumbUrl =  "img/videoIcon.png";
								}
								else {
									$thumbUrl =  "img/file.png"; 	
								}
								$sContentURL = $aContents[$jjj]['url'];
								$sFileName = $aContents[$jjj]['file_name']; 
								$sImageDisplay = "contents/images/".$sFileName;
								?>
								<div class="classImgContainer">
									<img src="<?php echo $sImageDisplay; ?>" alt=""  />
									<input type="hidden" class="classContentURL" value="<?php echo $sContentURL; ?>" />
								</div>
								<h4><?php echo $aContents[$jjj]['file_name']; ?></h4>
								<p><?php echo $aContents[$jjj]['added_on']; ?></p>
							</div>
						</li>
						<?php
					}
					echo '</ul>';
					
					?>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			$('.classBrowser li').dblclick(function() {
				var url = $(this).find("input.classContentURL").val();
				window.opener.CKEDITOR.tools.callFunction(<?php echo $iCkFuncNum; ?>,url);
				window.close();
			});

			$('.classSelectable').selectable({ 
  				cancel: '.ui-selected' 
			});
		</script>