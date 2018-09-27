test-watch:
	jest --watch

test:
	jest

lint:
	tslint -c tslint.json 'src/**/*.ts'
	tsfmt -r

develop:
	nodemon

build:
	NODE_ENV=production	tsc 

start:
	ts-node ./

commit:
	npm run build
	npx git-cz

ci:
	npm run lint
	npm run test
	npm publish

publish:
	semantic-release

create-docs:
	rm -rf docs
	npx jsdoc src -d ./docs -R README.md -P package.json 
