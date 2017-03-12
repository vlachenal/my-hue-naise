#!/bin/sh

npm run build
cp -r server dist
cp -r vendor dist
tar Jcvf my-hue-naise.tar.xz dist/*
