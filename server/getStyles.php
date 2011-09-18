<?php
	$api_key = 'g2dgxhfatcspkunbb7m33zv6';
	$make = $_REQUEST['make'];
	$model = $_REQUEST['model'];
	$year = $_REQUEST['year'];
	$res = file_get_contents('http://api.edmunds.com/v1/api/vehicle/modelyearrepository/foryearmakemodel?make='.$make.'&model='.$model.'&year='.$year.'&api_key='.$api_key.'&fmt=json');
	$arr = array();
	$jsn = json_decode($res);
	foreach ($jsn as $object) {
		foreach ($object as $obj) {
			array_push($arr, json_encode($obj->styles));
	   	} 
	}
	echo '{"styles": '.implode(', ', $arr) .'}';
?>