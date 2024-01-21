#!/bin/bash

# Script to dump database

echo 'Creating dump directory...'
docker exec -it db bash -c 'mkdir /dump'

echo 'Dumping database...'
docker exec -it db bash -c 'mysqldump -u root -p cw_data > /dump/database-dump.sql'

echo 'Copying database dump to host...'
docker cp db:/dump/database-dump.sql ./db/dump/database-dump.sql

echo 'Removing dump from container...'
docker exec -it db bash -c 'rm -r /dump'

echo 'Done.'
