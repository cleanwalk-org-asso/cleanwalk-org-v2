echo 'Creating dump directory...'
docker exec -it db bash -c 'mkdir /dump'

echo 'Copying dump file to /dump/database.dump...'
docker cp ./db/dump/database-dump.sql db:/dump/database-dump.sql

echo 'Restoring database...'
docker exec -it db bash -c 'mysql cw_data < /dump/database-dump.sql'

echo 'Deleting dump file...'
docker exec -it db bash -c 'rm -r /dump'

echo 'Done.'
