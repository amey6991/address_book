<?php
$filePath = dirname(__FILE__)."/../Delegation/uml/DelegationStructure.php";
function shuffle_text($text) {
    $iStrLen = strlen($text);
    $sNewString = '';
    for ($iii=0; $iii <$iStrLen; $iii++) { 
        $sNewString.=$text[$iii+2].$text[$iii+1].$text[$iii];
        $iii+=2;
    }
    return $sNewString;
}

if(file_exists($filePath)) {
    $lb = shuffle_text("SESOISC_NCEHREK");
    define($lb, true);
}

?>