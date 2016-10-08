
//reg for numbers
var numeric = /^[0-9]+$/;
var enumeric = /^$|^[0-9]+$/;


var float = /^[0-9]*[\.]?[0-9]+$/;
var efloat = /^$|^[0-9]*[\.]?[0-9]+$/;

//reg for alphabet
var alpha = /^[a-zA-Z]+$/;
var ealpha = /^$|^[a-zA-Z]+$/;

//reg for alphanumeric
var alphanumeric = /^[a-zA-Z0-9]+$/;
var ealphanumeric = /^$|^[a-zA-Z0-9]+$/;


//reg for name with space,dot(.),'
var name = /^[a-zA-Z]+([.]?[ ]?[a-zA-Z]+)*$/;
//var ename = /^$|^[a-zA-Z]+('[a-zA-Z])?[a-zA-Z]*([.]?[ ][\s]?[a-zA-Z]$/;
var ename = /[a-zA-Z\s\']+$/;


var fname = /^$|^[a-zA-Z]+([.]?[a-zA-Z]+)*$/;
var efname = /^$|^[a-zA-Z]+([.]?[a-zA-Z]+)*$/;

//reg for email
var email = /^[a-zA-Z0-9]{1}([a-zA-Z0-9]?[\.\-\_]{0,1}[a-zA-Z0-9]+)*[@]{1}(([a-zA-Z0-9]+[\.]{1})+([a-zA-Z]+))$/;
var eemail = /^$|^[a-zA-Z0-9]{1}([a-zA-Z0-9]?[\.\-\_]{0,1}[a-zA-Z0-9]+)*[@]{1}(([a-zA-Z0-9]+[\.]{1})+([a-zA-Z]+))$/;

//reg for phone no.
var phone = /^[0-9]+$|^[0-9]{3,4}[ \-]?[0-9]+$/;
var ephone = /^$|^[0-9]+$|^[0-9]{3,4}[ \-]?[0-9]+$/;


//reg for mobile no.
var mobile = /^[0]?[0-9]{1}[0-9]{9}$/;
var emobile = /^$|^[0]?[0-9]{1}[0-9]{9}$/;


var pin = /^[0-9]{6}$/;
var epin = /^$|^[0-9]{6}$/;

var esalphanumeric = /^$|^[a-zA-Z0-9 ]+$/;
var salphanumeric = /^$|[a-zA-Z0-9 ]+$/;
var regno = /^$|^[a-zA-Z0-9\-\_]+$/;

//var address = /^$|^[a-zA-Z0-9\-\,\/\ \#]+$/;
var address = /^$|^[a-zA-Z0-9\-\,\/\( )\ \#\.\n]+$/;

var alphanumeric_product = /^[a-zA-Z0-9 %\-\.]+$/;

//! brief function to divert a page to another in the same window
function fDivertPage(sPageLink){

	window.location.href = sPageLink;
}

//! brief function to check rates
function fCheckServiceRates(sString){

	var sRegularExp = /^[0-9]+$/;
	var sRegularExp = /^[1-9]\d*$/;
	var sRegularExp = /^[0-9]+(\.[0-9]{1,2})?$/;

	if(!sString.match(sRegularExp)){
		return false;
	}else{
		return true;
	}
}

//! brief function to validate email id
function fValidateEmail(sString){

	var sRegularExp = /^$|^[a-zA-Z0-9]{1}([a-zA-Z0-9]?[\.\-\_]{0,1}[a-zA-Z0-9]+)*[@]{1}(([a-zA-Z0-9]+[\.\-\_]{1})+([a-zA-Z]+))$/;

	if(!sString.match(sRegularExp)){
		return false;
	}else{
		return true;
	}
}

//! brief function to validate number
function fValidateNumber(sString){

	var sRegularExp = /^[0-9]+$/;

	if(!sString.match(sRegularExp)){
		return false;
	}else{
		return true;
	}
}

//this function used to validate the numbers
//this function takes the values of the element as an input
function valid_number(input_val)
{
   var val = input_val;

   //match the value with the regular expression
   if(numeric.test(val) == true)
   {    
        //if match return true
        return true;
   }
    else
   {
        return false;
   }
}

//this function used to validate the numbers or empty
//this function takes the values of the element as an input
function valid_enumber(input_val)
{
   var val = input_val;

   //match the value with the regular expression
   if(enumeric.test(val) == true)
   {
        //if match return true
        return true;
   }
    else
   {
        return false;
   }
}
//this function used to validate the Not Empty Field
//this function takes the values of the element as an input
function valid_not_empty(input_val)
{
   var val = input_val;

   //match the value with the regular expression
   if(val != "")
   {
        //if match return true
        return true;
   }
    else
   {
        return false;
   }
}




//this function used to validate the Float
//this function takes the values of the element as an input
function valid_float(input_val)
{
   var val = input_val;

   //match the value with the regular expression
   if(float.test(val) == true)
   {
        //if match return true
        return true;
   }
    else
   {
        return false;
   }
}



//this function used to validate the Float or empty
//this function takes the values of the element as an input
function valid_efloat(input_val)
{
   var val = input_val;

   //match the value with the regular expression
   if(efloat.test(val) == true)
   {
        //if match return true
        return true;
   }
    else
   {
        return false;
   }
}
//this function used to validate the proper alphabet
//this function takes the id of the element as an input
function valid_alphabet(input_val)
{
    var val = input_val;

    //match the value of the input id with the regular expression
   if(alpha.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        return false;
   }
}
//this function used to validate the proper alphabet or empty
//this function takes the id of the element as an input
function valid_ealphabet(input_val)
{
    var val = input_val;

    //match the value of the input id with the regular expression
   if(ealpha.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        return false;
   }
}
//this function used to validate the proper alphanumeric
//this function takes the id of the element as an input
function valid_alphanumeric(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

   if(alphanumeric.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}
function valid_salphanumeric(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

   if(salphanumeric.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}

function valid_alphanumeric_product(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

   if(alphanumeric_product.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}


//this function used to validate the proper alphanumeric or empty
//this function takes the id of the element as an input
function valid_ealphanumeric(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

   if(ealphanumeric.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}

//this function used to validate the proper alphanumeric or empty
//this function takes the id of the element as an input
function valid_esalphanumeric(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

   if(esalphanumeric.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}





//this function used to validate the proper name
//this function takes the id of the element as an input
function valid_name(input_val)
{
   var val = input_val;

	//ksg91
	return true;
   //match the value of the input id with the regular expression
   if(name.test(val) == true)
   {
        //alert("success");
        //if match return true
        return true;
   }
   else
   {
        //alert("failure");
        return false;
   }
}




//this function used to validate the proper name or empty
//this function takes the id of the element as an input
function valid_ename(input_val)
{       //alert('sdssd');
   //  alert('sdsd');
   var val = input_val;

   //match the value of the input id with the regular expression
   if(ename.test(val) == true)
   {
        //alert("success");
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}

function valid_enamemm(input_val)
{
   //  alert('sdsd');
   var val = input_val;

   //match the value of the input id with the regular expression
   if(ename.test(val) == true)
   {
        //alert("success");
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}

//this function used to validate the proper email
//this function takes the id of the element as an input
function valid_email(input_val)
{
     var val = input_val;
    //match the value of the input id with the regular expression

   if(email.test(val) == true)
   {
        //alert("success");
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}





//this function used to validate the proper email or empty
//this function takes the id of the element as an input
function valid_eemail(input_val)
{
     var val = input_val;
    //match the value of the input id with the regular expression

   if(eemail.test(val) == true)
   {
        //alert("success");
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}



//this function used to validate the proper Phone
//this function takes the id of the element as an input
function valid_phone(input_val)
{
    var val = input_val;
    //match the value of the input id with the regular expression

  if(phone.test(val) == true)
   {
        if(val == 0)
        return false;
        else
        return true;
   }
   else
   {
         //alert("failure");
        return false;
   }
}





//this function used to validate the proper phone or empty
//this function takes the id of the element as an input
function valid_ephone(input_val)
{
    var val = input_val;
    //match the value of the input id with the regular expression

  if(ephone.test(val) == true)
   {
        if(val == 0)
        return false;
        else
        return true;
   }
   else
   {
         //alert("failure");
        return false;
   }
}
//this function used to validate the proper mobile
//this function takes the id of the element as an input
function valid_mobile(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

    if(mobile.test(val) == true)
   {
        //alert("success");
        //if match return true
        if(val == 0)
        return false;
        else
        return true;
   }
   else
   {
         //alert("failure");
        return false;
   }
}

//this function used to validate the proper mobile or empty
//this function takes the id of the element as an input
function valid_emobile(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

    if(emobile.test(val) == true)
   {
        //alert("success");
        //if match return true
        if(val == 0)
        return false;
        else
        return true;
   }
   else
   {
         //alert("failure");
        return false;
   }
}
//this function used to validate the proper pincode
//this function takes the id of the element as an input
function valid_pin(input_val)
{
    var val = input_val;
    //match the value of the input id with the regular expression

  if(pin.test(val) == true)
   {
        //alert("success");
        //if match return true
        return true;
   }
   else
   {
         //alert("failure");
        return false;
   }
}

//this function used to validate the proper pincode or empty
//this function takes the id of the element as an input
function valid_epin(input_val)
{
    var val = input_val;
    //match the value of the input id with the regular expression

  if(epin.test(val) == true)
   {
        //alert("success");
        //if match return true
        return true;
   }
   else
   {
         //alert("failure");
        return false;
   }
}

//this function used to validate the proper alphanumeric and - or empty
//this function takes the id of the element as an input
function valid_regno(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

   if(regno.test(val) == true)
   {
        //if match return true
        return true;
   }
   else
   {
        // alert("failure");
        return false;
   }
}

//this function used to validate the proper alphanumeric
//this function takes the id of the element as an input
function valid_address(input_val)
{
   var val = input_val;
    //match the value of the input id with the regular expression

   if(val != '')
   {
     if(numeric.test(val) == false)
     {
       if(address.test(val) == true)
       {
            //if match return true
            return true;
       }
       else
       {
            return false;
       }
     }
      return false;
   }
   return true;
}

//! brief function to check characte fileds
function fCheckCharacter(){

  return true;
}

//! brief function to validate numeric values
function fValidateNumbersField(sString){

  var sRegularExp = /^[0-9]+$/;

  if(!sString.match(sRegularExp)){
    return false;
  }else{
    return true;
  }
}

//! brief function to validate email id
function fValidateEmailID(sString){

  var sRegularExp = /^$|^[a-zA-Z]{1}([a-zA-Z0-9]?[\.\-\_]{0,1}[a-zA-Z0-9]+)*[@]{1}(([a-zA-Z0-9]+[\.]{1})+([a-zA-Z]+))$/;

  if(!sString.match(sRegularExp)){
    return false;
  }else{
    return true;
  }
}

/*************************Functions for attachedments ********************/

function fCheckAttachement(oThis){
    
  var aFileTypes = ["bmp","gif","png","jpg","jpeg", "pdf","doc","docx","xls","xlsx","mkv","flv","webm","avi","wmv","mp4"];
  var sSource = oThis.value;
  var aTemp = sSource.split(".");
  var sExt = aTemp[aTemp.length - 1].toLowerCase();

  var isValid = $.inArray(sExt, aFileTypes);

  if(isValid == -1) {
    alert("THAT IS NOT AN APPROVED FILETYPE\nPlease load a file with an extention of one of the following:\n\n"+aFileTypes.join(", "));
    return false;
  } else {
    return true;
  }
}

/*************************************************************************/


function getAge(sDate) {
  var today = new Date();
  var birthDate = new Date(sDate);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getStatusNameFromInt(iStatus) {
    sStatus = iStatus.toString();
    switch (sStatus) {
        case '-1':
            return "Abandoned";
        case '0':
            return "Scheduled";
        case '1':
            return "Patient Arrived";
        case '2':
            return "Patient Engaged";
        case '3':
            return "Checked Out";
        default:
            return "Unknown";
    }
}


function isInteger(val){
  if(val){
    return val.match(/^\d+$/);
  }

  return true;
}


function convertToDDMMYYYY(dbDate) {
  var date = new Date(dbDate);
  var y = date.getFullYear();
  var m = ("0"+(date.getMonth() + 1 ).toString()).substr(-2);
  var d = ("0"+(date.getDate() ).toString()).substr(-2);

  return d+"-"+m+"-"+y;

}
function convertTohiA(dbDate) {
  var date = new Date(dbDate);
  
  var hour = date.getHours();
  var meridiem = hour >= 12 ? "PM" : "AM";
  var formattedTime = ((hour + 11) % 12 + 1) + ":" + date.getMinutes() +" "+ meridiem;
  return formattedTime;

}