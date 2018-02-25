#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

KITTY_CONFIG=~/.config/kitty/kitty.conf
mkdir -p $(dirname $KITTY_CONFIG)
ln -s -f $DIR/kitty.conf $KITTY_CONFIG
