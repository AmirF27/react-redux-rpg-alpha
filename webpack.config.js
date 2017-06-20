var path = require("path");

module.exports = {
    devtool: "source-map",
    entry: path.resolve(__dirname, "src") + "/app/index.js",
    output: {
        path: path.resolve(__dirname, "dist") + "/app/",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react"]
                    }
                }
            }
        ]
    }
};
