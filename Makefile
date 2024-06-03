install:
	npm ci

db-setup:
	touch db/tasks.db
	node utilits/createTable.js

db-clear:
	rm db/tasks.db

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

run:
	npm run dev