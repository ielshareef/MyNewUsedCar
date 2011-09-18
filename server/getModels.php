<?php
	$api_key = 'g2dgxhfatcspkunbb7m33zv6';
	$make = $_REQUEST['make'];
	$res = file_get_contents('http://api.edmunds.com/v1/api/vehicle-directory-ajax/findmakemodels?make='.$make.'&api_key='.$api_key.'&fmt=json');
	$arr = array();
	$jsn = json_decode($res);
	foreach ($jsn as $object) {
		foreach ($object as $obj) {
			if (isset($obj->years->USED)) {
				$newYears = array();
				for ($i=0; $i < count($obj->years->USED); $i++) {
					array_push($newYears, json_decode('{"year": "'.$obj->years->USED[$i].'"}'));
				}
				$obj->years = $newYears;
				array_push($arr, json_encode($obj));
			}
	   	} 
	}
	echo '{"models": ['.implode(', ', $arr) .']}';
?>