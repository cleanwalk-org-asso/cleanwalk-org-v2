#!/bin/bash

# Script to install Portainer

echo 'Creating volume...'
docker volume create portainer_data

echo 'Starting Portainer...'
docker run -d -p 9000:9000 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
