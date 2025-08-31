class MusicPlayer {
    constructor() {
        this.songs = [];
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.isShuffleMode = false;
        this.repeatMode = 'none'; // 'none', 'one', 'all'
        this.filteredSongs = [];
        
        this.initializeElements();
        this.loadSongs();
        this.bindEvents();
    }

    initializeElements() {
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.progressBar = document.querySelector('.progress-bar');
        this.progress = document.getElementById('progress');
        this.progressHandle = document.getElementById('progressHandle');
        this.currentTime = document.getElementById('currentTime');
        this.duration = document.getElementById('duration');
        this.currentTitle = document.getElementById('currentTitle');
        this.currentArtist = document.getElementById('currentArtist');
        this.playlist = document.getElementById('playlist');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.clearSearchBtn = document.getElementById('clearSearch');
        this.songCount = document.getElementById('songCount');
        this.musicFileInput = document.getElementById('musicFileInput');
    }

    async loadSongs() {
        try {
            // 尝试从服务器获取音乐文件列表
            const response = await fetch('./get-music-files.php');
            if (response.ok) {
                const musicFiles = await response.json();
                this.processMusicFiles(musicFiles);
            } else {
                throw new Error('无法从服务器获取文件列表');
            }
        } catch (error) {
            console.log('无法从服务器获取文件列表，使用预设列表');
            // 如果无法从服务器获取，使用预设的文件列表
            this.loadPresetSongs();
        }
    }

    loadPresetSongs() {
        // 预设的音乐文件列表
        const musicFiles = [
            "阿刁-张韶涵#2lUmAk.mp3",
            "爱-小虎队#8OVk.mp3",
            "爱如潮水-张信哲#h0N4C.mp3",
            "半点心-草蜢#1zm5p.mp3",
            "半生愁-浅影阿#2oyTtV.mp3",
            "不怕-苏星婕#2uhHFZ.mp3",
            "不再联系-程响#f55f8.mp3",
            "不再犹豫-Beyond#97BQ.mp3",
            "布拉格广场-蔡依林.周杰伦#949p.mp3",
            "沧海一声笑-黄霑.罗大佑.徐克#fvUSN.mp3",
            "曾经的你-许巍#9obk.mp3",
            "成都-赵雷#21x5W.mp3",
            "传奇-李健#91mM.mp3",
            "春涧-浅影阿#2oWbbk.mp3",
            "春娇与志明-Mangoleidi#gkMF4.mp3",
            "大海-张雨生#9Kds.mp3",
            "大眠-王心凌#htydw.mp3",
            "刀剑如梦-周华健#9JSL.mp3",
            "稻香-周杰伦#aeUJ.mp3",
            "等你归来-程响#2mlrVX.mp3",
            "多情种-胡杨林#1zAjV.mp3",
            "饿狼传说-.港囧.电影片头曲-张学友#1xPND.mp3",
            "飞云之下-韩红.林俊杰#gk6jT.mp3",
            "故里逢春-糯米Nomi#2lwNlm.mp3",
            "故事终章-程响#2sEt0d.mp3",
            "红日-李克勤#ff8m0.mp3",
            "红山果-安与骑兵#1AlYY.mp3",
            "鸿-兰音Reine#2xK9s4.mp3",
            "蝴蝶泉边-黄雅莉#fjeKt.mp3",
            "护花使者-李克勤#9LN9.mp3",
            "黄昏-周传雄#1qiAu.mp3",
            "活着-郝云#h0Ro3.mp3",
            "即便我身如雪花-张梦初#2Fzmm3.mp3",
            "可能-程响#2qmxz8.mp3",
            "宽容-张信哲#givlD.mp3",
            "蓝莲花-许巍#f7XAX.mp3",
            "老男孩-筷子兄弟#c8ko.mp3",
            "理想三旬-陈鸿宇#1NuFY.mp3",
            "淋雨一直走-张韶涵#1FcTu.mp3",
            "满天星辰不及你-ycccc#2p0lLe.mp3",
            "美丽的神话-成龙#1KFBV.mp3",
            "梦醒时分-陈淑桦#9muY.mp3",
            "明天.你好-牛奶咖啡#1qo6o.mp3",
            "明天会更好-华语群星.mp3",
            "明天会更好-卓依婷#aD3b.mp3",
            "暮色回响-张韶涵#2BIdtv.mp3",
            "男儿当自强-林子祥#h1z0Y.mp3",
            "暖暖-梁静茹#9hXf.mp3",
            "篇章-张韶涵.王赫野#2q9QXe.mp3",
            "七月上-Jam#2nQHq8.mp3",
            "千年等一回-高胜美#15wF.mp3",
            "千纸鹤-邰正宵#9oaR.mp3",
            "亲爱的那不是爱情-简弘亦#9Q0U.mp3",
            "人间烟火-程响#2pOl7w.mp3",
            "人世间-雷佳#2pqPx7.mp3",
            "人是.-周深#2sPUSf.mp3",
            "如愿-朱桦#2oqP4O.mp3",
            "容易受伤的女人-王菲#eUfP7.mp3",
            "弱水三千-石头.张晓棠#1Mi2c.mp3",
            "三寸天堂-.步步惊心.电视剧片尾曲-严艺丹#1znKD.mp3",
            "少年中国说 .Live.-张杰#2oz2cx.mp3",
            "神话.情话-周华健.齐豫#g8MkL.mp3",
            "声声慢.粤语完整版.-陈艺鹏#2qeu2n.mp3",
            "世间美好与你环环相扣-柏松#2l9OIp.mp3",
            "世界那么大还是遇见你-三石#jkkra.mp3",
            "是妈妈是女儿-黄绮珊.希林娜依高#2sUqU1.mp3",
            "时光洪流-程响#2o5Vjv.mp3",
            "水手-郑智化#14or.mp3",
            "探世书-浅影阿.mp3",
            "特别的爱给特别的你-齐秦#1qdnp.mp3",
            "同桌的你-老狼#1qfB8.mp3",
            "王招君-任素汐#2n7viW.mp3",
            "吻别-张学友#93mY.mp3",
            "我曾-隔壁老樊#hZ4Bz.mp3",
            "我的纸飞机-GooGoo.王之睿#2vqxGB.mp3",
            "无名的人-毛不易#2p6Hen.mp3",
            "西海情歌-刀郎#9f8U.mp3",
            "戏说因果-浅影阿.朝歌夜弦#2q1OvE.mp3",
            "下一个天亮-郭静#gj2YI.flac",
            "潇洒走一回-叶倩文#1qgaR.mp3",
            "小芳-李春波#16TC.mp3",
            "小美满-周深#2ym4VF.mp3",
            "选择-林子祥.叶倩文#bVs3.mp3",
            "烟雨行舟-司南#he6Ej.mp3",
            "樱花草-陈卓璇#2mjE3M.mp3",
            "游京.新版.-海伦#2lGurx.mp3",
            "有形的翅膀-张韶涵#1xVR9.mp3",
            "原点-西单女孩#2kYDCv.mp3",
            "月光-胡彦斌#1KVJC.mp3",
            "长大成人-范茹#2qWlC2.mp3",
            "谪居-浅影阿.汐音社#2qgJGg.mp3",
            "真的爱你-Beyond#1qfKf.mp3",
            "折风渡夜-六少飞#2lRQV6.mp3",
            "只为碎银几两-周林枫.L.桃籽.#2sZFFK.mp3",
            "最浪漫的事-赵咏华#9xKb.mp3",
            "隐形的翅膀-张韶涵#9C9g.mp3",
            "一千个伤心的理由-张学友#9LDc.mp3",
            "一生所爱-卢冠廷.莫文蔚#f0uzM.mp3",
            "A Little Love-冯曦妤#ahAt.mp3",
            "Lemon-米津玄師#ghxLh.mp3"
        ];

        this.processMusicFiles(musicFiles);
    }

    processMusicFiles(musicFiles) {
        this.songs = musicFiles.map((filename, index) => {
            const { title, artist } = this.parseSongInfo(filename);
            
            return {
                id: index,
                title: title,
                artist: artist,
                filename: filename,
                src: `music/${encodeURIComponent(filename)}`,
                duration: '00:00'
            };
        });

        this.filteredSongs = [...this.songs];
        this.renderPlaylist();
        
        // 显示加载完成的提示
        console.log(`已加载 ${this.songs.length} 首歌曲`);
    }

    parseSongInfo(filename) {
        // 解析文件名获取歌曲信息
        const parts = filename.replace(/\.(mp3|flac)$/i, '').split('-');
        const title = parts[0] || filename;
        const artist = parts[1] ? parts[1].split('#')[0] : '未知艺术家';
        
        return { title, artist };
    }

    renderPlaylist() {
        this.playlist.innerHTML = '';
        this.songCount.textContent = this.filteredSongs.length;

        this.filteredSongs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'song-item';
            songItem.dataset.index = index;
            
            if (this.songs[this.currentSongIndex] && song.id === this.songs[this.currentSongIndex].id) {
                songItem.classList.add('active');
            }

            songItem.innerHTML = `
                <div class="song-number">${index + 1}</div>
                <div class="song-details">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `;

            songItem.addEventListener('click', () => {
                this.playFromFilteredList(index);
            });

            this.playlist.appendChild(songItem);
        });
    }

    playFromFilteredList(filteredIndex) {
        const song = this.filteredSongs[filteredIndex];
        const originalIndex = this.songs.findIndex(s => s.id === song.id);
        this.currentSongIndex = originalIndex;
        this.loadCurrentSong();
        this.play();
    }

    bindEvents() {
        // 播放控制
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        
        // 模式切换
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        
        // 音量控制
        this.volumeSlider.addEventListener('input', (e) => {
            this.audioPlayer.volume = e.target.value / 100;
        });
        
        // 进度条控制
        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        
        // 音频事件
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('ended', () => this.handleSongEnd());
        
        // 搜索功能
        this.searchInput.addEventListener('input', () => this.searchSongs());
        this.searchBtn.addEventListener('click', () => this.searchSongs());
        this.clearSearchBtn.addEventListener('click', () => this.clearSearch());
        
        // 文件选择功能
        this.musicFileInput.addEventListener('change', (e) => this.handleFileSelection(e));
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        if (!this.audioPlayer.src) {
            this.loadCurrentSong();
        }
        
        this.audioPlayer.play().then(() => {
            this.isPlaying = true;
            this.playBtn.textContent = '⏸️';
            this.updateCurrentSongDisplay();
        }).catch(error => {
            console.error('播放失败:', error);
        });
    }

    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.playBtn.textContent = '▶️';
    }

    loadCurrentSong() {
        if (this.songs.length === 0) return;
        
        const song = this.songs[this.currentSongIndex];
        this.audioPlayer.src = song.src;
        this.updateCurrentSongDisplay();
        this.renderPlaylist(); // 更新播放列表中的活动状态
    }

    updateCurrentSongDisplay() {
        const song = this.songs[this.currentSongIndex];
        if (song) {
            this.currentTitle.textContent = song.title;
            this.currentArtist.textContent = song.artist;
        }
    }

    previousSong() {
        if (this.isShuffleMode) {
            this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
        }
        this.loadCurrentSong();
        if (this.isPlaying) {
            this.play();
        }
    }

    nextSong() {
        if (this.isShuffleMode) {
            this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        }
        this.loadCurrentSong();
        if (this.isPlaying) {
            this.play();
        }
    }

    toggleShuffle() {
        this.isShuffleMode = !this.isShuffleMode;
        this.shuffleBtn.classList.toggle('active', this.isShuffleMode);
    }

    toggleRepeat() {
        const modes = ['none', 'all', 'one'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];
        
        this.repeatBtn.classList.toggle('active', this.repeatMode !== 'none');
        
        // 更新按钮显示
        switch (this.repeatMode) {
            case 'none':
                this.repeatBtn.textContent = '🔁';
                break;
            case 'all':
                this.repeatBtn.textContent = '🔁';
                break;
            case 'one':
                this.repeatBtn.textContent = '🔂';
                break;
        }
    }

    handleSongEnd() {
        switch (this.repeatMode) {
            case 'one':
                this.audioPlayer.currentTime = 0;
                this.play();
                break;
            case 'all':
                this.nextSong();
                break;
            default:
                if (this.currentSongIndex < this.songs.length - 1 || this.isShuffleMode) {
                    this.nextSong();
                } else {
                    this.pause();
                }
                break;
        }
    }

    seekTo(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const seekTime = percent * this.audioPlayer.duration;
        this.audioPlayer.currentTime = seekTime;
    }

    updateProgress() {
        if (this.audioPlayer.duration) {
            const percent = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
            this.progress.style.width = percent + '%';
            this.progressHandle.style.left = percent + '%';
            
            this.currentTime.textContent = this.formatTime(this.audioPlayer.currentTime);
        }
    }

    updateDuration() {
        this.duration.textContent = this.formatTime(this.audioPlayer.duration);
        
        // 更新歌曲列表中的时长显示
        const song = this.songs[this.currentSongIndex];
        if (song) {
            song.duration = this.formatTime(this.audioPlayer.duration);
            this.renderPlaylist();
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    searchSongs() {
        const query = this.searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            this.filteredSongs = [...this.songs];
        } else {
            this.filteredSongs = this.songs.filter(song => 
                song.title.toLowerCase().includes(query) || 
                song.artist.toLowerCase().includes(query)
            );
        }
        
        this.renderPlaylist();
    }

    clearSearch() {
        this.searchInput.value = '';
        this.filteredSongs = [...this.songs];
        this.renderPlaylist();
    }

    handleFileSelection(e) {
        const files = Array.from(e.target.files);
        const audioFiles = files.filter(file => file.type.startsWith('audio/'));
        
        if (audioFiles.length === 0) {
            alert('请选择音频文件！');
            return;
        }

        // 清空现有歌曲列表
        this.songs = [];
        
        // 处理选中的音频文件
        audioFiles.forEach((file, index) => {
            const { title, artist } = this.parseSongInfo(file.name);
            const url = URL.createObjectURL(file);
            
            this.songs.push({
                id: index,
                title: title,
                artist: artist,
                filename: file.name,
                src: url,
                duration: '00:00',
                file: file
            });
        });

        this.filteredSongs = [...this.songs];
        this.currentSongIndex = 0;
        this.renderPlaylist();
        
        console.log(`已加载 ${this.songs.length} 首用户选择的歌曲`);
        
        // 如果有歌曲，自动加载第一首
        if (this.songs.length > 0) {
            this.loadCurrentSong();
        }
    }

    handleKeyboard(e) {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSong();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSong();
                break;
        }
    }
}

// 初始化播放器
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});