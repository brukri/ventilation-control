const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'ventilation-control.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        // This is the important part for onoff to work
        new webpack.ExternalsPlugin('commonjs', ['onoff']),
    ],
    target: 'node',
};
