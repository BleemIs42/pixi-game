var babel = require("babel-core")
var file = '../src/lib/index.js'
babel.transformFile(file, function (err, result) {
    // result; // => { code, map, ast }
    process.stdout.write(result.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})