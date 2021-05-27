#!/bin/bash

git fetch
sudo forever stop server2.js
sudo forever stop serverCron.js
git reset --hard origin/main
sudo npm run build
sudo npm run export
sudo forever start server2.js
sudo forever start serverCron.js
sudo forever list