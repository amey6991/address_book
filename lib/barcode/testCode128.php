<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script type="text/javascript" src="../js/jquery-2.1.1.js"></script>
</head>
<body>
	<div class="col-lg-11 col-md-10 col-sm-12 col-xs-12 classPageMain">
		<!-- Page content -->
		<div class="row classPageContent">
			<!-- Page Content -->
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 classDivContent">
				<form role="form" class="classGenerateBarCode" id="idGenerateBarCode" method="post" action="testCode128Emulator.php">
					<div class="row">
						<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
							<div class="form-group">
								<label class="control-label" for="idClientName">Enter Code</label>	
								<input type="text" class="form-control" name="idBarcodeCode" id="idBarcodeCode" />
							</div>
						</div>
						<br>
						<br>	
						<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
							<button type="submit" id="idButtonSubmit" class="btn btn-primary">Generate Barcode</button>
						</div>			
					</div>
				</form>
			</div>
		</div>
	</div>

	<script>
	//! For sending form data to emulator form
    /*$(function() {
        $('#idGenerateBarCode').submit(function(e) {
            e.preventDefault();

            data = new FormData($('#idGenerateBarCode')[0]);

            $.ajax({
                type: 'POST',
                url: 'testCode128Emulator.php',
                data: data,
                cache: false,
                contentType: false,
                processData: false,                
                success: function(data) {
                    if(data != false) {
                        alert("Barcode Generated..");
                        
                    }
                    else {
                        alert("something went wrong..")
                    }
                }
            });
        });
    }); */
	</script>
</body>
</html>