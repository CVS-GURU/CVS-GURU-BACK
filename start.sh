#!/bin/bash

if [ $# -eq 0 ]; then
    params=(node)            # start with node, if dont have any params
elif [ $# -eq 1 ]; then
    params=("$@")     		        # for stop, incremental build, start
else
    echo "using 1 params. java or node"
    echo "input param is '$@'"
    exit 1
fi

start_java() {
    echo "starting java is not yet to ready"
}

start_node() {
    echo "starting node is not yet to ready"
}

case ${params} in
    java)
        if ! start_java; then
            exit 1
        fi;;
    node)
        if ! start_node; then
            exit 1
        fi ;;
    *)
        echo "undefined params. java or node"
        echo "input param is '${params}'"
        exit 1;;
esac

exit 0