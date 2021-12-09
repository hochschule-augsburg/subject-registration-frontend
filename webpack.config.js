const path = require('path');

module.exports = {
    output: {
        filename: 'subject-registration-frontend.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }],
    },
};
