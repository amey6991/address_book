<?php
$sPageTopTitle = 'View All Contacts';
include_once 'ajax_functions.php'
?>
</!DOCTYPE html>
<html lang="en">
<head>
	<?php include_once 'addressBookTop.php';?>
	<script type="text/javascript">
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			  if (this.readyState == 4 && this.status == 200) {
			  	if(this.responseText=='1'){
			  		document.getElementById("idResponseMsg").innerHTML = 'Contact Information Saved.';
			  	}else{
			  		document.getElementById("idResponseMsg").innerHTML = 'Contact Information Not Saved.';
			  	}
			  }
			};
			xhttp.open("GET", "ajax_all_contacts.php", true);
			xhttp.send();
	</script>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12">
					<div class="row">
						<div class="col-lg-3 col-md-3 col-sm-3">
							Hello
						</div>
						<div class="col-lg-6 col-md-6 col-sm-16">
							<div class="row">
								<div class="col-lg-12 col-md-12 col-sm-12">
									<center><h2>View All</h2></center>
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12" id="idMainContent" style="margin-top:10px;">
									
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-3 col-lg-3">
							Bye
						</div>
					</div>
			</div>
		</div>
	</div>
</body>
</html>