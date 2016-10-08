<?php
//! Include configEhr.php file for constant variable values.
include_once dirname(__FILE__)."/../../config/configEhr.php";
include_once ABS_PATH_TO_EHR."classes/class.DBConnManager.php";


$sRedTo = urlencode($_REQUEST['redTo']);

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title><?php echo CONFIG_BRAND_NAME .' | '. $title; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type="text/javascript" src="../js/jquery-ui/js/jquery-1.9.0.js"></script>
		<script type="text/javascript" src="../js/jquery-ui/js/jquery-ui-1.10.0.custom.min.js"></script>
		<script src="../js/bootstrap.min.js"></script>
		<script src="../js/modernizr.custom.14343.js"></script>
		<script type="text/javascript" src="../js/knockout.js"></script>
		<script type="text/javascript" src="../js/ko.mapping.js"></script>
		<script type="text/javascript" src="../js/jquery.cookie.js"></script>
		
		
		<link rel="stylesheet" type="text/css" href="../js/jquery-ui/css/smoothness/jquery-ui-1.10.0.custom.min.css" />
		<link rel="stylesheet" type="text/css" href="../css/jquery.dataTables.css" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="../css/bootstrap-responsive.min.css" />
		<link href="../css/font-awesome.css" rel="stylesheet">
		<link href="../css/style.css" rel="stylesheet">

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
					<h4 class="pull-right">Uploader</h4>	
				</div>

			</div>		
		</div>
		<div class="container-fluid">
			

			<div class='row-fluid'>
				<div class="span12 classWidget">
					<div class="classWidgetHeader">
						Select a File
					</div>
					<div class="classWidgetBody">
						<form action="uploadFormEmulator.php?redTo=<?php echo $sRedTo; ?>" class="form form-horizontal" method="post" enctype="multipart/form-data">
							<label class="classLabel">
									File:
							</label>
							<input type="file" name="upload" />
							<br />
							<input type="submit" name="" value="Upload" class="btn classButton" />
						</form>
					</div>
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