<?php
	error_reporting(0);
	$api_key = 'g2dgxhfatcspkunbb7m33zv6';
	$id = $_REQUEST['id'];
	$mileage = $_REQUEST['mil'];
	$cond = $_REQUEST['cond'];
	$lat = $_REQUEST['lat'];
	$lng = $_REQUEST['lng'];
	$callback = '';
	if (isset($_REQUEST['callback'])) {
		$callback = $_REQUEST['callback'];
	}
	$res = file_get_contents('http://api.edmunds.com/v1/api/region/ziprepository/findzip?latitude='.$lat.'&longitude='.$lng.'&api_key='.$api_key.'&fmt=json');
	$jsn = json_decode($res);
	$zip = $jsn->zipsHolder[0]->zipCode;
	
	$res2 = file_get_contents('http://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid='.$id.'&condition='.$cond.'&mileage='.$mileage.'&zip='.$zip.'&api_key='.$api_key.'&fmt=json');
	$arr = array();
	$jsn = json_decode($res2);
	foreach ($jsn as $object) {
		foreach ($object as $k=>$obj) {
			if ($k == 'totalWithOptions') {
				if ($callback) {
				    header('Content-Type: text/javascript');
				    echo $callback . '(' . '{"price": "'.number_format($obj->usedPrivateParty).'", "zip": "'.$zip.'"}' . ');';
				} else {
				    echo '{"price": "'.number_format($obj->usedPrivateParty).'"}';
				}
			}
	   	} 
	}
?>