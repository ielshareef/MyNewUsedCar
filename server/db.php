<?php
$m = new Mongo();
$db = $m->test;
$col = $db->test;
$cursor = $col->find();
foreach ($cursor as $obj) {
    print $obj["id"] . "\n";
}
?>