#! /bin/bash
if [ "$#" -ne 1 ] ; then
    echo "Usage: $0 {tag-name}"
else
    podman run -it --rm -v="$(pwd):/usr/src/app" -p 127.0.0.1:8080:8080   "$1" /bin/bash
fi