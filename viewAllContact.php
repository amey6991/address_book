<?php
$sPageTopTitle = 'View All Contacts';
include_once 'funContacts.php';
$aAllList = getAllContact();
$sAllList = json_encode($aAllList);
?>
</!DOCTYPE html>
<html lang="en">
<head>
	<?php include_once 'addressBookTop.php';?>
</head>
<body onclick="hideFilter(event)">
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12" id="idListTemplateView">
				<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12" style="margin-top:10px">
						<div class="col-lg-2 col-md-2 col-sm-2">
							<a href="#" onclick="goBack()" class="btn btn-primary">Add Contact</a>
						</div>
						<div class="col-lg-8 col-md-8 col-sm-8">
							<center><h2><strong>List View of Contacts</strong></h2></center>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-2">
							<a href="#" onclick="viewGridView()" class="btn btn-primary">Grid View</a>
							<a href="#" onclick="displayFilter(2)" class="btn btn-primary classApplyFilter">Filter</a>
							<ul class="dropdown-menu classDropdownMenu" id="idFilterMenu_2" role="menu" style="display:none">
								<li id="idSortByID" class="classFilerList">
									<a id="1" href="#" onclick="applyFilter(this.id,2)" class="pull-left">Sort By ID <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_1"></i></a>
										
								</li>
								<li id="idSortByName" class="classFilerList">
									<a class="pull-left" id="2" href="#" onclick="applyFilter(this.id,2)">Sort By FirstName <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_2"></i></a>
								</li>
								<li id="idSortByMobile" class="classFilerList">
									<a class="pull-left" id="3" href="#" onclick="applyFilter(this.id,2)">Sort By Mobile <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_3"></i></a>
								</li>
								<li id="idSortByEmail" class="classFilerList">
									<a class="pull-left" id="4" href="#" onclick="applyFilter(this.id,2)">Sort By Email <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_4"></i></a>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12">
						<div class="row">
							<div class="col-lg-12 col-md-12 col-sm-12">
								<!-- <h4>View All Contacts</h4> -->
							</div>
							<div class="col-lg-12 col-md-12 col-sm-12" id="idMainContent" style="margin-top:10px;">
								<table class="table table-border" id="idListTable">
									<thead>
										<tr>
											<td>#</td>
											<td>First Name</td>
											<td>Last Name</td>
											<td>Email</td>
											<td>Mobile</td>
											<td>Address</td>
											<td>City</td>
											<td>State</td>
										</tr>
									</thead>
									<tbody id="idListContent">
										
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-12 col-md-12 col-sm-12" id="idGridTemplateView">
				<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12" style="margin-top:10px">
						<div class="col-lg-2 col-md-2 col-sm-2">
							<a href="#" onclick="goBack()" class="btn btn-primary">Add Contact</a>
						</div>
						<div class="col-lg-8 col-md-8 col-sm-8">
							<center><h2><strong>Grid View of Contacts</strong></h2></center>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-2">
							<a href="#" onclick="viewListView()" class="btn btn-primary">List View</a>
							<a href="#" onclick="displayFilter(1)" class="btn btn-primary classApplyFilter">Filter</a>
							<ul class="dropdown-menu classDropdownMenu" id="idFilterMenu_1" role="menu" style="display:none">
								<li id="idSortByID" class="classFilerList">
										<a id="1" href="#" onclick="applyFilter(this.id,3)" class="pull-left">Sort By ID <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_1"></i></a>
										
								</li>
								<li id="idSortByName" class="classFilerList">
									<a class="pull-left" id="2" href="#" onclick="applyFilter(this.id,3)">Sort By FirstName <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_2"></i></a>
								</li>
								<li id="idSortByMobile" class="classFilerList">
									<a class="pull-left" id="3" href="#" onclick="applyFilter(this.id,3)">Sort By Mobile <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_3"></i></a>
								</li>
								<li id="idSortByEmail" class="classFilerList">
									<a class="pull-left" id="4" href="#" onclick="applyFilter(this.id,3)">Sort By Email <i class="fa fa-check pull-right classRightMargin" style="display:none;" id="classRightMargin_4"></i></a>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12" id="idGridTemplate" style="margin-top:10px">
						
						
						
					</div>
				</div>
			</div>
		</div>
	</div>

<script type="text/javascript">
	var iType = "<?php echo $iType;?>";
	var sAllList = JSON.parse('<?php echo $sAllList;?>');
	var sContent = '';
	var sGridBox = '';
	
	var sGridBody = document.getElementById('idGridTemplate');
	sGridBody.innerHTML = sGridBox;
	
	var sBody = document.getElementById('idListTable');
	sBody.innerHTML = sContent;
	
	prepareView(sAllList,1);

	function prepareView(sAllList,iDisplay){
			var sContent = '';
			var sGridBox = '';
			var sGridBody = document.getElementById('idGridTemplate');
			sGridBody.innerHTML = sGridBox;
	
			var sBody = document.getElementById('idListTable');
			sBody.innerHTML = sContent;
		for(list in sAllList){
			var sBody = document.getElementById('idListTable');
			var sGridBody = document.getElementById('idGridTemplate');

			var sFirstName = sAllList[list]['first_name'];
			var sLastName = sAllList[list]['last_name'];
			var sState = sAllList[list]['state'];
			var sCity = sAllList[list]['city'];
			var iContactID = sAllList[list]['contact_id'];
			
			var sFullName = sFirstName+' '+sLastName;

			sContent+='<tr>';
			sContent+='<td>'+iContactID+'</td>';
			sContent+='<td>'+sFirstName+'</td>';
			sContent+='<td>'+sLastName+'</td>';
			
			var aEmail = sAllList[list]['email'];
			var sEmail = '';
			for(key in aEmail){
				sEmail+= aEmail[key]+'</br>';
			}
			sContent+='<td>'+sEmail+'</td>';
			var aMobile = sAllList[list]['mobile'];
			var sMobile='';
			for(key in aMobile){
				sMobile+= aMobile[key]+'</br>';
			}
			sContent+='<td>'+sMobile+'</td>';

			var aAddress = sAllList[list]['address'];
			var sAddress = '';
			for(key in aAddress){
				sAddress+= aAddress[key]+'</br>';
			}
			sContent+='<td>'+sAddress+'</td>';

			sContent+='<td>'+sCity+'</td>';
			sContent+='<td>'+sState+'</td>';

			sContent+='</tr>';
			sGridBox+="<div class='col-lg-4 col-md-4 col-sm-4' id='idGridTemplateBox'>";
			sGridBox+="<div class='panel panel-primary'>";
			sGridBox+="<div class='panel-heading'>#"+iContactID+" - "+sFullName+"</div>";
			sGridBox+="<div class='panel-body' id='idGridPanel'>";
			
			sGridBox+="<div class='col-lg-3 col-md-3 col-sm-3'>Name</div>";
			sGridBox+="<div class='col-lg-9 col-md-9 col-sm-9'>"+sFullName+"</div>";
			
			sGridBox+="<div class='col-lg-3 col-md-3 col-sm-3'>Email</div>";
			sGridBox+="<div class='col-lg-9 col-md-9 col-sm-9'>"+sEmail+"</div>";		
		
			sGridBox+="<div class='col-lg-3 col-md-3 col-sm-3'>Mobile</div>";
			sGridBox+="<div class='col-lg-9 col-md-9 col-sm-9'>"+sMobile+"</div>";

			sGridBox+="<div class='col-lg-3 col-md-3 col-sm-3'>City</div>";
			sGridBox+="<div class='col-lg-9 col-md-9 col-sm-9'>"+sCity+"</div>";
			sGridBox+="<div class='col-lg-3 col-md-3 col-sm-3'>State</div>";
			sGridBox+="<div class='col-lg-9 col-md-9 col-sm-9'>"+sState+"</div>";

			sGridBox+="<div class='col-lg-3 col-md-3 col-sm-3'>Address</div>";
			sGridBox+="<div class='col-lg-9 col-md-9 col-sm-9'>"+sAddress+"</div>";
				
			sGridBox+="</div>";
			sGridBox+="</div>";
			sGridBox+="</div>";
			sGridBox+="</div>";
		}
		
		sBody.innerHTML = sContent;
		sGridBody.innerHTML = sGridBox;
		if(iDisplay==1){
			document.getElementById('idListTemplateView').style.display='block';
			document.getElementById('idGridTemplateView').style.display='none';
		}else if(iDisplay==2){
			document.getElementById('idListTemplateView').style.display='block';
			document.getElementById('idGridTemplateView').style.display='none';
		}else if(iDisplay==3){
			document.getElementById('idListTemplateView').style.display='none';
			document.getElementById('idGridTemplateView').style.display='block';
		} 
	}

	function viewGridView(){
		document.getElementById('idListTemplateView').style.display='none';
		document.getElementById('idGridTemplateView').style.display='block';
	}
	function viewListView(){
		document.getElementById('idGridTemplateView').style.display='none';
		document.getElementById('idListTemplateView').style.display='block';
	}
	function displayFilter(iValue){
			if(iValue==1){
				document.getElementById('idFilterMenu_1').style.display='block';
			}else{
				document.getElementById('idFilterMenu_2').style.display='block';
			}
	}
	function applyFilter(iValue,iDisplay){
		// console.log(iValue);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
		  	var sAllList = JSON.parse(this.responseText);
			var sContent = '';
			var sGridBox = '';
			
			var sGridBody = document.getElementById('idGridTemplate');
			sGridBody.innerHTML = sGridBox;
			
			var sBody = document.getElementById('idListTable');
			sBody.innerHTML = sContent;
			
			prepareView(sAllList,iDisplay);

			if(iValue==1){
				document.getElementById("classRightMargin_1").style.display='block';
				document.getElementById("classRightMargin_2").style.display='none';
				document.getElementById("classRightMargin_3").style.display='none';
				document.getElementById("classRightMargin_4").style.display='none';
			}else if(iValue==2){
				document.getElementById("classRightMargin_1").style.display='none';
				document.getElementById("classRightMargin_2").style.display='block';
				document.getElementById("classRightMargin_3").style.display='none';
				document.getElementById("classRightMargin_4").style.display='none';
			}else if(iValue==3){
				document.getElementById("classRightMargin_1").style.display='none';
				document.getElementById("classRightMargin_2").style.display='none';
				document.getElementById("classRightMargin_3").style.display='block';
				document.getElementById("classRightMargin_4").style.display='none';
			}else if(iValue==4){
				document.getElementById("classRightMargin_1").style.display='none';
				document.getElementById("classRightMargin_2").style.display='none';
				document.getElementById("classRightMargin_3").style.display='none';
				document.getElementById("classRightMargin_4").style.display='block';
			}
			
		  }
		};
		xhttp.open("GET", "ajax_functions.php?sFlag=getAllContactsWithFilter&iValue="+iValue+"", true);
		xhttp.send();


	}
	function hideFilter(evt){
		evt.preventDefault();
		if(evt.target.className == "btn btn-primary classApplyFilter"){
			return;
		}else{
			document.getElementById('idFilterMenu_1').style.display='none';
			document.getElementById('idFilterMenu_2').style.display='none';
		}
	}
	
	function goBack(){
		location.replace("addContact.php");
	}	  
	
</script>
</body>
</html>