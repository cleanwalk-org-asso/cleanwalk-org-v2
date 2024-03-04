#!/bin/bash

# Script to start development environment

docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d "$@"
