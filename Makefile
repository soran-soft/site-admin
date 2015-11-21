BIN=./node_modules/.bin

SRC_JS=$(shell find src -name '*.js')
DEV_JS=$(patsubst src/%.js, dev/%.js, $(SRC_JS))

all: build

#dev:; @NODE_ENV=development $(MAKE) -j5 webpack-server dev-server watch
dev-server: $(DEV_JS); $(BIN)/nodemon --harmony ./dev/server/index.js
webpack-server: $(DEV_JS); node --harmony ./dev/server/webpack.js
watch:; $(BIN)/babel src -d dev -e 0 -s inline -w

build:; $(BIN)/webpack --progress
clean:; rm -rf dist

$(DEV_JS): dev/%.js: src/%.js
	mkdir -p $(dir $@)
	$(BIN)/babel $< -e 0 -o $@ -s true

.PHONY: all build clean dev-server watch webpack-server
