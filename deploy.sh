#!/bin/sh

path='/apps/muashop.by/data'

mkdir -p $path
cd $path
pwd
echo 'Pulling latest changes'
git pull
echo 'DONE!'

