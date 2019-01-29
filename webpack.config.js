var webpack = require('webpack');
var filename = "bundle.js";
var entry = "./src/index.tsx";
var plugins =
    [
        new webpack.optimize.ModuleConcatenationPlugin()
    ];

module.exports = function () {

    filename = "bundle/sample.js";

    return {
        entry: entry,
        output: {
            filename: filename,
            libraryTarget: "umd"
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: "source-map",
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },
        plugins: plugins,
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.ts(x?)$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/
                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    exclude: /node_modules/,
                    enforce: "pre"
                }
            ]
        }
    }
}