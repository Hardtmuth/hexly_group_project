install:
	npm ci

db-setup:
	touch db/tasks.db
	/opt/sqlite/sqlite3 db/tasks.db < db/setup.sql

db-clear:
	rm db/tasks.db

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

run:
	npm run dev