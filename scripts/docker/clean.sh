#!/usr/bin/env bash
echo "Stopping running containers..."
docker stop $(docker ps -a -q)