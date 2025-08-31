@echo off
echo 🎵 正在更新音乐播放列表...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到Node.js
    echo 请先安装Node.js: https://nodejs.org/
    pause
    exit /b 1
)

REM 运行生成脚本
node generate-playlist.js

echo.
echo 🎉 播放列表更新完成！
echo 💡 提示: 现在可以刷新浏览器页面来加载新的音乐文件
echo.
pause