<?php

if ($_POST['action'] == 'upload_screen' && !empty($_FILES['upload_file']))
{
    $returnArr = array();
    $returnArr['success'] = 0;
    /*Create and write image file*/
    $fileHash = md5(time()).rand(0, 99999);
    $uploadDerictory = dirname(__FILE__).'/uploads/';
    $fileName = $fileHash.'.png';


    if (move_uploaded_file($_FILES['upload_file']['tmp_name'], $uploadDerictory.$fileName))
    {
        $returnArr['success'] = 1;
        $returnArr['redirect_url'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['SERVER_NAME'].'/view.php?image='.$fileHash;

    }
    /*Create and write image file end*/

    echo json_encode($returnArr);
    exit;
}
