const path = require('path');

module.exports = {
    output: {
        filename: 'subject-registration-frontend.bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css?$/,
                loader: "css-loader"
            },
            {
                test: /\.scss?$/,
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            }
        ],
    },
};
