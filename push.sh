#mysqldump --defaults-extra-file=client.cnf -u db_pkb db_pkb > db_pkb-laptop.sql
DATE=`date +%Y-%m-%d`
git status
git add -A
git commit -m "${DATE}"
git push --set-upstream origin master
