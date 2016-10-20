<?php
$sPageTopTitle = 'Add Contact';
include_once 'ajax_functions.php'
?>
</!DOCTYPE html>
<html lang="en">
<head>
	<?php include_once 'addressBookTop.php';?>
	<script type="text/javascript">
		$(document).ready(function(){
			
		});
		
		function clearContactFrom(){
			document.getElementById("idFormAddContact").reset();
		}

		function addContact(){
			var sFirstName = document.getElementById('idFirstName').value;
			var sLastName = document.getElementById('idLastName').value;
			var sState = document.getElementById('idState').value;
			var sCity = document.getElementById('idCity').value;
			//!! get Email ID
			var sClassElement = document.getElementsByClassName("classEmail");
			var aEmail = [];
			for(var i = 0; i < sClassElement.length; i++)
			{
				if(sClassElement.item(i).value != ''){
					aEmail.push(sClassElement.item(i).value);
				}
			}
			//!! get Mobiel numbers
			var sClassElement = document.getElementsByClassName("classMobile");
			var aMobile = [];
			for(var i = 0; i < sClassElement.length; i++)
			{
				if(sClassElement.item(i).value != ''){
			   		aMobile.push(sClassElement.item(i).value);
				}
			}
			//!! get Address
			var sClassElement = document.getElementsByClassName("classAddress");
			var aAddress = [];
			for(var i = 0; i < sClassElement.length; i++)
			{
				if(sClassElement.item(i).value != ''){
			   		aAddress.push(sClassElement.item(i).value);
				}
			}
			var sEmailJSON = JSON.stringify(aEmail);
			var sMobileJSON = JSON.stringify(aMobile);
			var sAddressJSON = JSON.stringify(aAddress);

			if(sFirstName ==''){
				alert('FirstName is empty');
				return false;
			}
			// This is not required
			// if(aEmail.length == 0){
			// 	alert('Email is empty');
			// }else if(aMobile.length==0){
			// 	alert('Mobile is empty');
			// }else if(aAddress.length==0){
			// 	alert('Address is empty');
			// }
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			  if (this.readyState == 4 && this.status == 200) {
			  	if(this.responseText=='1'){
			  		document.getElementById("idResponseMsg").innerHTML = 'Contact Information Saved.';
			  	}else{
			  		document.getElementById("idResponseMsg").innerHTML = 'Contact Information Not Saved.';
			  		document.getElementById("idFormAddContact").reset();
			  	}
			  }
			};
			xhttp.open("GET", "ajax_functions.php?sFlag=addContactMaster&sFirstName="+sFirstName+"&sLastName="+sLastName+"&sState="+sState+"&sCity="+sCity+"&sEmailJSON="+sEmailJSON+"&sMobileJSON="+sMobileJSON+"&sAddressJSON="+sAddressJSON, true);
			xhttp.send();

		}

		function addMoreEMail(){
			var sMainElement = document.getElementById("idEmailAppend");
			sID='';
			var sClassElement = document.getElementsByClassName("classEmail");
			for(var i = 0; i < sClassElement.length; i++)
			{
			   sID = sClassElement.item(i).id;
			}
			var aID = sID.split('_');
			iID = parseInt(aID[1])+1;
			sID = 'idEmail_'+iID;
			var element = document.createElement("input");
			element.setAttribute("type", "text");
			element.setAttribute("value", "");
			element.setAttribute("class", "form-control classEmail");
			element.setAttribute("id", sID);
			element.setAttribute("style", "margin-top:10px;");
			sMainElement.appendChild(element);
		}
		function addMoreMobile(){
			var sMainElement = document.getElementById("idMobileAppend");
			sID='';
			var sClassElement = document.getElementsByClassName("classMobile");
			for(var i = 0; i < sClassElement.length; i++)
			{
			   sID = sClassElement.item(i).id;
			}
			var aID = sID.split('_');
			iID = parseInt(aID[1])+1;
			sID = 'idMobile_'+iID;
			var element = document.createElement("input");
			element.setAttribute("type", "text");
			element.setAttribute("value", "");
			element.setAttribute("class", "form-control classMobile");
			element.setAttribute("id", sID);
			element.setAttribute("style", "margin-top:10px;");
			sMainElement.appendChild(element);
		}
		function addMoreAddress(){
			var sMainElement = document.getElementById("idAddressAppend");
			sID='';
			var sClassElement = document.getElementsByClassName("classAddress");
			for(var i = 0; i < sClassElement.length; i++)
			{
			   sID = sClassElement.item(i).id;
			}
			var aID = sID.split('_');
			iID = parseInt(aID[1])+1;
			sID = 'idAddress_'+iID;
			var element = document.createElement("textarea");
			element.setAttribute("type", "text");
			// element.setAttribute("value", "");
			element.setAttribute("class", "form-control classAddress");
			element.setAttribute("id", sID);
			element.setAttribute("style", "margin-top:10px;width:100%;");
			sMainElement.appendChild(element);
		}

		function showAll(){
			window.location.href = 'viewAllContact.php';
		}
	</script>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12">
					<div class="row">
						<div class="col-lg-12 col-md-12 col-sm-12">
							<div class="row">
								<div class="col-lg-12 col-md-12 col-sm-12">
									<div class="col-lg-10 col-md-10 col-sm-10">
										<center><h2>Add Contact Information</h2></center></br>	
										<span id="idResponseMsg"></span>
									</div>
									<div class="col-lg-2 col-md-2 col-sm-2">
										<input type="button" class="btn btn-info" value="View All" id="idButtonViewAll" style="margin-top:5px;" onclick="showAll()">
									</div>
								</div>
								<div class="col-lg-12 col-md-12 col-sm-12" style="margin-top:10px;">
									<div class="col-lg-3 col-md-3 col-sm-3">
									</div>
									<div class="col-lg-6 col-md-6 col-sm-6">
										<form class="form-horizontal" id="idFormAddContact" >
										<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
												First Name
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8">
												<input type="text" class="form-control" id="idFirstName">
											</div>
										</div>

										<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
												Last Name
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8">
												<input type="text" class="form-control" id="idLastName">
											</div>
										</div>

										<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
												Email
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8">
												<input type="text" class="form-control classEmail" id="idEmail_1">
											</div>
											<div class="col-lg-4 col-md-4 col-sm-4 hide">
												<button><i class="fa fa-plus" aria-hidden="true"></i></button>
											</div>
										</div>
		                               	<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8" id="idEmailAppend">
												
											</div>
										</div>
		                                <div class="form-group">
		                                    <div class="col-lg-3 col-md-3 col-sm-3 pull-right" style="">
		                                        <a data-add-email href="#" id="idAddMoreEmail" onclick="addMoreEMail()"><em>Add More Email</em></a>
		                                    </div>
		                                </div>
		                                <div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
												Mobile Number
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8">
												<input type="text" class="form-control classMobile" id="idMobile_1">
											</div>
										</div>
		                               	<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8" id="idMobileAppend">
												
											</div>
										</div>
		                                <div class="form-group">
		                                    <div class="col-lg-3 col-md-3 col-sm-3 pull-right" style="">
		                                        <a data-add-mobile-number href="#" id="idAddMoreMobile" onclick="addMoreMobile()"><em>Add More Mobile</em></a>
		                                    </div>
		                                </div>
										<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
												State
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8">
												<input type="text" class="form-control" id="idState">
											</div>
										</div>
										<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
												City
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8">
												<input type="text" class="form-control" id="idCity">
											</div>
										</div>
										<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
												Address
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8">
												<textarea type="text" class="form-control classAddress" id="idAddress_1"></textarea>
											</div>
										</div>
										<div class="form-group">
											<div class="col-lg-4 col-md-4 col-sm-4">
											</div>
											<div class="col-lg-8 col-md-8 col-sm-8" id="idAddressAppend">
												
											</div>
										</div>
		                                <div class="form-group">
		                                    <div class="col-lg-3 col-md-3 col-sm-3 pull-right" style="">
		                                        <a data-add-address-number href="#" id="idAddMoreAddress" onclick="addMoreAddress()"><em>Add More Address</em></a>
		                                    </div>
		                                </div>
										</form>
									</div>
									<div class="col-lg-3 col-md-3 col-sm-3">
									</div>
								</div>
								<div class="col-lg-6 col-md-6 col-sm-6 pull-right">
									<input type="button" id="idAddContact" onclick="addContact()" class="btn btn-success btn-lg" value="Save">
									<input type="button" id="idAddContact" onclick="clearContactFrom()" class="btn btn-success btn-lg" value="Clear">
								</div>
							</div>
						</div>
					</div>
			</div>
		</div>
	</div>
</body>
</html>