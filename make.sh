#!/bin/sh

npm run build
cp -r server dist
cp -r vendor dist
cd dist
tar Jcvf ../my-hue-naise.tar.xz *
cd -
