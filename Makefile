EMCC=emcc

all: ./src_c/main.c
	$(EMCC) -O3 -s WASM=1 -o ./src/main.js -s EXTRA_EXPORTED_RUNTIME_METHODS='["getValue", "setValue"]' -s EXPORTED_FUNCTIONS="['_calloc', '_DP_tsp']" -s EXPORT_ES6=1 -s MODULARIZE=1 ./src_c/main.c