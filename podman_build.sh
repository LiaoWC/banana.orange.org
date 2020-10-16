#! /bin/bash
if [ "$#" -ne 1 ] ; then
    echo "Usage: $0 {tag-name_you_want}"
else
    podman build -t "$1" .
fi