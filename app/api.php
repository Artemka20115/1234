<?php
//echo 111;
$dir = getcwd();
$log_f = fopen( 'log.txt', 'a');
fwrite( $log_f, 'persNr : ' . $_POST['persNr'] . "\n" . 'data : ' . $_POST['data'] . "\n");
fclose( $log_f);
?>