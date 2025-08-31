<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// 启用缓存控制（EdgeOne环境优化）
header('Cache-Control: public, max-age=300'); // 5分钟缓存
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime(__FILE__)) . ' GMT');

// 音乐文件夹路径
$musicDir = './music/';

// 支持的音频文件扩展名
$supportedExtensions = ['mp3', 'flac', 'wav', 'ogg', 'm4a', 'aac'];

$musicFiles = [];
$totalSize = 0;
$lastModified = 0;

try {
    if (is_dir($musicDir)) {
        $files = scandir($musicDir);
        
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
                $filePath = $musicDir . $file;
                
                // 检查是否为文件且为支持的音频格式
                if (is_file($filePath)) {
                    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                    
                    if (in_array($extension, $supportedExtensions)) {
                        $musicFiles[] = $file;
                        $totalSize += filesize($filePath);
                        $lastModified = max($lastModified, filemtime($filePath));
                    }
                }
            }
        }
    }

    // 按文件名排序
    sort($musicFiles);

    // 返回详细信息（用于调试和监控）
    $response = [
        'files' => $musicFiles,
        'count' => count($musicFiles),
        'totalSize' => $totalSize,
        'lastModified' => date('Y-m-d H:i:s', $lastModified),
        'timestamp' => time(),
        'server' => 'EdgeOne-PHP'
    ];

    // 如果请求参数包含 simple=1，只返回文件列表
    if (isset($_GET['simple']) && $_GET['simple'] == '1') {
        echo json_encode($musicFiles, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to scan music directory',
        'message' => $e->getMessage(),
        'timestamp' => time()
    ], JSON_UNESCAPED_UNICODE);
}
?>