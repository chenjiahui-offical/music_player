# 🚀 EdgeOne 托管部署指南

## 📋 准备工作

### 1. 整理项目文件
确保你的项目包含以下文件：
```
music-player/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 脚本文件
├── get-music-files.php # PHP动态检测脚本
├── music-files.js      # 音乐文件列表（自动生成）
├── music/              # 音乐文件夹
│   ├── 歌曲1.mp3
│   ├── 歌曲2.mp3
│   └── ...
└── README.md           # 说明文档
```

### 2. 生成最新音乐列表
在上传前，先运行：
```bash
node generate-playlist.js
```

## 🌐 EdgeOne 官网部署步骤

### 步骤1：登录EdgeOne控制台
1. 访问 [EdgeOne控制台](https://console.cloud.tencent.com/edgeone)
2. 使用腾讯云账号登录

### 步骤2：创建站点
1. 点击 **"添加站点"**
2. 输入你的域名（如：music.example.com）
3. 选择套餐类型（免费版即可）
4. 点击 **"下一步"**

### 步骤3：配置DNS
1. 根据提示配置域名的NS记录
2. 等待DNS生效（通常需要几分钟到几小时）

### 步骤4：上传网站文件
有两种方式：

#### 方式A：使用EdgeOne文件管理器
1. 在EdgeOne控制台，进入 **"源站管理"** > **"文件管理"**
2. 点击 **"上传文件"** 或 **"上传文件夹"**
3. 选择并上传以下文件：
   - `index.html`
   - `style.css` 
   - `script.js`
   - `get-music-files.php`
   - `music-files.js`
   - `music/` 文件夹（包含所有音乐文件）

#### 方式B：使用FTP/SFTP
1. 在EdgeOne控制台获取FTP连接信息
2. 使用FTP工具（如FileZilla）连接
3. 上传所有项目文件到根目录

### 步骤5：配置缓存规则
1. 进入 **"缓存配置"** > **"缓存规则"**
2. 添加以下规则：

```
规则1 - HTML文件（短缓存）
- 匹配条件：文件扩展名 = html
- 缓存时间：5分钟
- 浏览器缓存：5分钟

规则2 - CSS/JS文件（长缓存）
- 匹配条件：文件扩展名 = css,js
- 缓存时间：1天
- 浏览器缓存：1天

规则3 - 音频文件（长缓存）
- 匹配条件：文件扩展名 = mp3,flac,wav,ogg,m4a
- 缓存时间：7天
- 浏览器缓存：7天

规则4 - 动态文件（短缓存）
- 匹配条件：文件扩展名 = php
- 缓存时间：5分钟
- 浏览器缓存：不缓存
```

### 步骤6：启用HTTPS
1. 进入 **"HTTPS配置"**
2. 开启 **"HTTPS重定向"**
3. 配置SSL证书（可使用免费证书）

## 🔄 每次添加新歌曲的操作流程

### 1. 本地更新
```bash
# 1. 将新音乐文件放入music文件夹
cp 新歌曲.mp3 music/

# 2. 生成最新的音乐文件列表
node generate-playlist.js

# 3. 提交到Git（可选）
git add .
git commit -m "添加新歌曲: 新歌曲名"
git push
```

### 2. 上传到EdgeOne
有以下几种方式：

#### 方式A：只上传新文件（推荐）
1. 登录EdgeOne控制台
2. 进入文件管理
3. 上传新的音乐文件到 `music/` 目录
4. 更新 `music-files.js` 文件

#### 方式B：批量更新
1. 使用FTP工具连接EdgeOne
2. 上传整个 `music/` 文件夹
3. 上传更新的 `music-files.js` 文件

#### 方式C：完整重新部署
1. 重新上传所有文件
2. 适用于大量更新的情况

### 3. 清理缓存
1. 在EdgeOne控制台，进入 **"缓存管理"** > **"缓存刷新"**
2. 选择 **"URL刷新"**
3. 输入需要刷新的URL：
   ```
   https://your-domain.com/music-files.js
   https://your-domain.com/get-music-files.php
   https://your-domain.com/music/
   ```
4. 点击 **"提交"**

## 🎯 快速命令参考

### 本地操作
```bash
# 生成音乐列表
node generate-playlist.js

# 查看生成的文件
cat music-files.js

# 统计音乐数量
grep -o '"[^"]*\.mp3"' music-files.js | wc -l
```

### 验证部署
```bash
# 检查网站是否正常
curl https://your-domain.com

# 检查音乐文件API
curl https://your-domain.com/get-music-files.php?simple=1

# 检查特定音乐文件
curl -I https://your-domain.com/music/歌曲名.mp3
```

## 🔧 故障排除

### 问题1：音乐文件无法播放
- 检查文件路径是否正确
- 确认音乐文件已成功上传
- 检查浏览器控制台是否有错误

### 问题2：新歌曲不显示
- 确认已运行 `node generate-playlist.js`
- 检查 `music-files.js` 是否已更新
- 清理EdgeOne缓存

### 问题3：PHP文件不执行
- 确认EdgeOne支持PHP
- 检查文件权限设置
- 查看EdgeOne错误日志

## 📞 技术支持

如遇到问题，可以：
1. 查看EdgeOne官方文档
2. 联系EdgeOne技术支持
3. 检查浏览器开发者工具的控制台错误

---

🎵 **享受你的音乐播放器！** 🎵