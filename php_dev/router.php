<?php

if(file_exists($_SERVER["DOCUMENT_ROOT"] . $_SERVER["REQUEST_URI"])) {
return false;
} else {
require $_SERVER["DOCUMENT_ROOT"]."/server/api.php";
}