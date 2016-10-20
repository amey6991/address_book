<?php
	include_once 'funContacts.php';
	include_once 'addressBookTop.php';
	$iType = $_GET['type'];
	$aAllList = getAllContact();
	$sAllList = json_encode($aAllList);
?>
<script type="text/javascript">
	var iType = "<?php echo $iType;?>";
	var sAllList = JSON.parse('<?php echo $sAllList;?>');
	console.log(typeof sAllList);
	var sContent = '';
	for(list in sAllList){
		var sFirstName = sAllList[list]['first_name'];
		var sLastName = sAllList[list]['last_name'];
		var sState = sAllList[list]['state'];
		var sCity = sAllList[list]['city'];
		sContent+='<tr>';
		sContent+='<td>'+parseInt(list+1)+'</td>';
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
	}
	var sBody = document.getElementById('idListContent');
	console.log(sContent);
	sBody.innerHTML(sContent);
</script>

							<tbody id="idListContent">
								
							</tbody>
						</table>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-3">
						Roght
					</div>
				</div>
			</div>
		</div>
	</div>
</body>