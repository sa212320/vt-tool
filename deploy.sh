#!/bin/bash

cd /home/vt-tool
git fetch
sudo forever stop server2.js
git reset --hard origin/main
npm run build
npm run export
sudo forever start server2.js
sudo forever list