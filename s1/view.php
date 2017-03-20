<?php

if (!empty($_GET['image']))
{
    $upload_derictory = dirname(__FILE__).'/uploads/';
    $file_exsist = file_exists($upload_derictory.$_GET['image'].'.png');
    $file_url = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['SERVER_NAME'].'/uploads/'.$_GET['image'].'.png';
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Screenshot created by SimpleScreenshoter</title>
    <link rel="stylesheet" href="skin/style.css">
</head>
<body>
<?php if ($file_exsist)
{ ?>
    <div class="editor_box">
        <img src="<?php echo $file_url; ?>" class="image_cropped">
        <p class="copyright_text">Sergey Savenko © 2017</p>
    </div>
<?php } else
{ ?>
    <h2 class="title_404" style="font-size: 100px; text-align: center;">404</h2>
<?php } ?>
</body>
</html>
