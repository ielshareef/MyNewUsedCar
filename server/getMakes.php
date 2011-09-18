<?php
	$api_key = 'g2dgxhfatcspkunbb7m33zv6';
	$res = file_get_contents('http://api.edmunds.com/v1/api/vehicle-directory-ajax/findmakes?api_key='.$api_key.'&fmt=json');
	$arr = array();
	$jsn = json_decode($res);
	foreach ($jsn as $object) {
		foreach ($object as $obj) {
	   		array_push($arr, json_encode($obj));
	   	} 
	}
	echo '{"makes": ['.implode(', ', $arr) .']}';
?>