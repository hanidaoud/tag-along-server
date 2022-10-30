# tag-along-server
 
# Docker

## Install with docker-compose

+ Make sure you have docker, docker-compose and git installed.
```
# Fedora and REHL based distros
$ sudo dnf install docker docker-compose git
# Arch
$ sudo pacman -S docker docker-compose git
```
+ Install tag-along-server. (docker-compose may require sudo privileges)
```
$ git clone https://github.com/hanidaoud/tag-along-server
$ cd tag-along-server
$ cp .env.sample .env   # change it as you see fit
$ docker-compose up --build
```
Make sure it builds correctly then exit `ctrl + c`. <br>
+ Now run it as a daemon: 
```
$ docker-compose up -d
```
You're all set.
