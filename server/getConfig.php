<?php
	$api_key = 'g2dgxhfatcspkunbb7m33zv6';
	$id = $_REQUEST['styleid'];
	$res = file_get_contents('http://api.edmunds.com/v1/api/vehicle/styleconfig/'.$id.'?api_key='.$api_key.'&fmt=json');
	$arr = array();
	$jsn = json_decode($res);
	$conf = array('color'=>array(), 'option'=>array());
	foreach ($jsn->$id->featuresMap as $object) {
		$id; $name; $type = ''; $cat = '';
		foreach ($object as $k=>$obj) {
			if ($k == "attributeGroups") {
				if (isset($obj->COLOR_TYPE) && isset($obj->COLOR_TYPE->attributes) && isset($obj->COLOR_TYPE->attributes->COLOR_TYPE) && isset($obj->COLOR_TYPE->attributes->COLOR_TYPE->value)) {
					$cat = 'Color';
					$type = $obj->COLOR_TYPE->attributes->COLOR_TYPE->value;
				} else if (isset($obj->OPTION_INFO) && isset($obj->OPTION_INFO->attributes) && isset($obj->OPTION_INFO->attributes->OPTION_CATEGORY) && isset($obj->OPTION_INFO->attributes->OPTION_CATEGORY->value)) {
					$cat = 'Option';
					$type = $obj->OPTION_INFO->attributes->OPTION_CATEGORY->value;
				} else if (isset($obj->OPTION_INFO) && isset($obj->OPTION_INFO->attributes) && isset($obj->OPTION_INFO->attributes->OPTION_TYPE) && isset($obj->OPTION_INFO->attributes->OPTION_TYPE->value)) {
					$cat = 'Option';
					$type = $obj->OPTION_INFO->attributes->OPTION_TYPE->value;
				}
			} else if ($k == "id") {
				$id = $obj;
			} else if ($k == "name") {
				$name = $obj;
			}
	   	}
		$lst = array(
			"id"=>$id,
			"name"=>$name,
			"type"=>$type,
			"cat"=>$cat
		);
		if ($cat == 'Color') {
			array_push($conf['color'], $lst);
		} else if ($cat == 'Option') {
			array_push($conf['option'], $lst);
		}
	}
	var_dump($conf);
	//echo '{"config": '.implode(', ', $arr) .'}';
?>