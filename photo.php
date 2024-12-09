<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo saveImage();

function saveImage()
{
    // 初始日志记录，查看是否收到图像数据
    error_log("Received image data: " . $_POST['imegse']);

    if (!isset($_POST['imegse']) || !preg_match('/^data:image\/(jpeg|png|gif);base64,/', $_POST['imegse'])) {
        error_log("Invalid input: " . $_POST['imegse']);
        return json_encode(["status" => "error", "message" => "Invalid input."]);
    }

    $image = $_POST['imegse'];
    $imageName = date("His") . "_" . rand(1111, 9999) . ".png";

    // Remove Base64 prefix
    if (strpos($image, ',') !== false) {
        $image = explode(',', $image)[1];
    }

    $path = __DIR__ . '/' . sanitizeIp(getIp()) . '/' . date("Ymd");
    
    if (!is_dir($path)) {
        mkdir($path, 0755, true);
        error_log("Created directory: " . $path);
    }

    $imageSrc = $path . "/" . $imageName;
    $result = file_put_contents($imageSrc, base64_decode($image));

    if ($result) {
        error_log("获取成功" . $imageSrc);
        return json_encode(["status" => "success", "path" => $imageSrc]);
    } else {
        error_log("获取失败" . $imageSrc);
        return json_encode(["status" => "error", "message" => "Failed to save image."]);
    }
}

function getIp()
{
    return $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? "unknown";
}

function sanitizeIp($ip)
{
    return preg_replace('/[^a-zA-Z0-9_\-]/', '', $ip);
}
?>
