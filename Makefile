.PHONY: requirements

NODE_BIN=./node_modules/.bin

requirements:
	npm install

develop: requirements

test: requirements
	$(NODE_BIN)/karma start --single-run

test-dev: requirements
	$(NODE_BIN)/karma start

quality: requirements
	$(NODE_BIN)/jshint lib/ test/
