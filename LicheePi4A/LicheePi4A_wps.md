# 在荔枝派上运行 WPS

### 实验设备

LicheePi 4A 内测版 8 + 32G

有线键盘

有线鼠标

HDMI屏幕

Win11 主机



## 实验过程

### 1. 硬件准备

硬件接口安装示意，如图

![](./images/gdk.png)



### 2. 软件准备

#### 2.1 系统烧录

此时只需要连接到 PC-USB 的供电线即可

系统烧录资源 [镜像集合 - Sipeed Wiki](https://wiki.sipeed.com/hardware/zh/lichee/th1520/lpi4a/3_images.html) [烧录镜像 - Sipeed Wiki](https://wiki.sipeed.com/hardware/zh/lichee/th1520/lpi4a/4_burn_image.html) 

参考烧录镜像链接中也可以，只是有一些名称不是最新的，截至 2024/9/26 这个文档应该是最新的



1. 根据 **镜像集合** 链接的网盘资源下载全部的镜像文件

   ```
   ├─20230714_cam
   ├─20240111
   ├─android
   ├─burn_tools
   └─LPI4A_20240602
   ```

   其中 `20240111` 和 `LPI4A_20240602` 是可以烧录的 Debian 系统，其他的系统根据需要自行选择

   `burn_tools` 是根据 `win` `linux` `Mac` 三个不同平台准备的烧录工具

   因为我是 **8+32G** 版本，所以选择 **`20240111`**，如果你是 内存更大的版本，可以选择 **`LPI4A_20240602`** 

   

2. 解压目标版本文件，**`LPI4A_BASIC_20240111.zip`** 得到文件如下

   ```
   drwxrwxr-x    2 24056    24056         4096 Sep 19 22:05 .
   drwxrwxr-x    3 24056    24056            0 Sep 19 22:05 ..
   -rw-rw-r--    1 24056    24056    524288000 Jan 08  2024 boot.ext4
   -rw-rw-r--    1 24056    24056      2513656 Oct 17  2023 fastboot
   -rwxrwxr-x    1 24056    24056         1364 Jan 08  2024 flash_image.sh
   -rw-rw-r--    1 24056    24056    4294967296 Jan 11  2024 root.ext4
   -rw-rw-r--    1 24056    24056       963024 Oct 16  2023 u-boot-with-spl-lpi4a-16g.bin
   -rw-rw-r--    1 24056    24056       963008 Oct 16  2023 u-boot-with-spl-lpi4a.bin
   ```



3. 更新 Win 的启动状态

   1. 设置 》系统 》恢复 》重新启动 》立即重新启动

   2. 重新启动后 》疑难解答 》高级选项 》重启 》**禁用驱动程序强制签名** 》重启

      ```
      Tip: 系统烧录完成后需要以正常方式二次启动  否则其他软件无法运行
      ```

      

4. 摁住供电线旁边的 BOOT 键然后把供电线连接到 PC 的 USB 口

5. 打开设备管理器，在 **其他设备** 中会出现 **USB download gadget** 设备，这个设备就是我们的荔枝派

6. 双击选择更新驱动程序，选择到包含这些文件的文件夹即可，完成驱动安装

   ```
   D:\LicheePi4A\image\burn_tools\windows
   
   drwxrwxr-x    3 24056    24056            0 Sep 19 21:32 .
   drwxrwxr-x    5 24056    24056            0 Sep 19 21:32 ..
   -rw-rw-r--    1 24056    24056        97792 Apr 07  2023 AdbWinApi.dll
   -rw-rw-r--    1 24056    24056        62976 Apr 07  2023 AdbWinUsbApi.dll
   -rwxrwxr-x    1 24056    24056          972 Sep 19 22:09 burn_lpi4a.bat
   -rwxrwxr-x    1 24056    24056      1630208 Apr 07  2023 fastboot.exe
   drwxrwxr-x    4 24056    24056         4096 Sep 19 21:32 usb_driver-fullmask
   ```



7. 编译 `D:\LicheePi4A\image\burn_tools\windows\burn_lpi4a.bat` 文件

   把下面的 **`YOURPATH`** 都换成你自己的 `image` 存储路径

   ```
   :: Script to flash imagess via fastboot, edit image path first
   
   @echo off
   call:RunACmd "YOURPATH\image\burn_tools\windows\fastboot.exe flash ram YOURPATH\image\20240111\LPI4A_BASIC_20240111\LPI4A_BASIC_20240111\u-boot-with-spl-lpi4a.bin"
   call:RunACmd "YOURPATH\image\burn_tools\windows\fastboot.exe reboot"
   ping 127.0.0.1 -n 5 >nul
   call:RunACmd "YOURPATH\image\burn_tools\windows\fastboot.exe flash uboot  YOURPATH\image\20240111\LPI4A_BASIC_20240111\LPI4A_BASIC_20240111\u-boot-with-spl-lpi4a.bin"
   call:RunACmd "YOURPATH\image\burn_tools\windows\fastboot.exe flash boot  YOURPATH\image\20240111\LPI4A_BASIC_20240111\LPI4A_BASIC_20240111\boot.ext4"
   call:RunACmd "YOURPATH\image\burn_tools\windows\fastboot.exe flash root  YOURPATH\image\20240111\LPI4A_BASIC_20240111\LPI4A_BASIC_20240111\root.ext4"
   
   pause
   exit
   
   :RunACmd
   SETLOCAL
   set CmdStr=%1
   echo IIIIIIIIIIIIIIII Run Cmd:  %CmdStr% 
   %CmdStr:~1,-1% || goto RunACmd
   
   GOTO:EOF
   
   ```

   保存后双击执行，完成系统烧录（很快

   

8. 会弹出一个 `powerShell` 界面展示过程，最后提示烧录成功



### 3. 软件环境准备

恭喜，已经完成系统烧录，可以插上各种外设探索荔枝派了 （该烧录系统默认不需要输密码

```
userName: sipeed
passWord: licheepi
```



因为开发板不好直接操作，我们一般选择远程连接，先联网，然后准备通过 `Xshell` 远程

```shell
sudo apt update

sudo apt install net-tools		# 默认安装了
sudo apt install git			# 未默认安装
sudo apt install ssh openssh-server

# ifconfig
ip addr show

# Tip: VSCode 不支持对 RISCV 架构的远程 所以通过 ssh 完成

# 为运行 X86 软件进行翻译准备  安装 Box64
git clone https://github.com/ptitSeb/box64.git
cd box64
mkdir build
cd build
cmake .. -D RV64=1 -D CMAKE_BUILD_TYPE=RelWithDebInfo
sudo make install -j$(nproc)

# 把 Box64 更新到系统变量中
vim ~/.bashrc

# 把该内容写到 .bashrc 文件的最后一行
export PATH=$PATH:/home/sipeed/box64/build

# 在命令行刷新 .bashrc 文件
source ./bashrc
```



### 4. 执行效果

#### WPS执行

```shell
# Tip: 一定通过 chrome 浏览器下载  通过 wget 下载格式有问题
mkdir wps
dpkg -X wps-office_11.1.0.11723.XA_amd64.deb ./wps
cd wps/opt/kingsoft/wps-office/office6/

box64 ./wps		# 运行 WPS

box64 ./et		# 运行 Excel

box64 ./wpp		# 运行 PPT
```

演示链接：