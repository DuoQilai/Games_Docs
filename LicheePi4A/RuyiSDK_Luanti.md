## Luanti 运行文档
### SDL2 包安装
当前使用的是 20250728 revyOS 镜像
可以直接下载我仓库的安装包，已通过测试，可以直接安装
下载
```bash
git clone https://gitee.com/huizhang_chen/lichee-pi_sdl2.git
```
``` bash
sudo dpkg --force-depends -i \
libsdl2-image-2.0-0_2.6.3+dfsg-1_riscv64.deb \
libsdl2-ttf-2.0-0_2.20.1+dfsg-2_riscv64.deb
```

### 下载编译好的项目
```bash
git clone https://gitee.com/huizhang_chen/luanti.git
```

### 运行游戏
```bash
cd luanti
./bin/luanti
```
