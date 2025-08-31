const fs = require('fs');
const path = require('path');

// 音乐文件夹路径
const musicDir = './music/';

// 支持的音频文件扩展名
const supportedExtensions = ['.mp3', '.flac', '.wav', '.ogg', '.m4a', '.aac'];

function generatePlaylist() {
    try {
        // 读取音乐文件夹
        const files = fs.readdirSync(musicDir);
        
        // 过滤音频文件
        const musicFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return supportedExtensions.includes(ext);
        }).sort();

        // 生成JavaScript代码
        const jsContent = `// 自动生成的音乐文件列表 - ${new Date().toLocaleString()}
const MUSIC_FILES = ${JSON.stringify(musicFiles, null, 4)};

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MUSIC_FILES;
}`;

        // 写入文件
        fs.writeFileSync('music-files.js', jsContent, 'utf8');
        
        console.log(`✅ 成功生成播放列表！共找到 ${musicFiles.length} 个音频文件`);
        console.log('📁 文件已保存为: music-files.js');
        
        return musicFiles;
    } catch (error) {
        console.error('❌ 生成播放列表时出错:', error.message);
        return [];
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    generatePlaylist();
}

module.exports = generatePlaylist;