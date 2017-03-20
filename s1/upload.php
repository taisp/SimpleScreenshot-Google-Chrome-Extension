<?php

if ($_POST['action'] == 'upload_screen' && !empty($_FILES['upload_file']))
{
    $return_arr = array();
    $return_arr['success'] = 0;
    /*Create and write image file*/
    $file_hash = md5(time()).rand(0, 99999);
    $upload_derictory = dirname(__FILE__).'/uploads/';
    $file_name = $file_hash.'.png';


    if (move_uploaded_file($_FILES['upload_file']['tmp_name'], $upload_derictory.$file_name))
    {
        $return_arr['success'] = 1;
        $return_arr['redirect_url'] = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['SERVER_NAME'].'/view.php?image='.$file_hash;

    }
    /*Create and write image file end*/

    echo json_encode($return_arr);
    exit;
}
