#!/bin/bash

npx http-server ./frontend/ -p 3333 & 
npx json-server ./backend/database.json  & 