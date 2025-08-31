#!/bin/bash

killall -9 http-server;
killall -9 json-server;
npx http-server ./frontend/ -p 3333 & 
npx json-server ./backend/database.json &  