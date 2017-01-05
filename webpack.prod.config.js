var path = require('path');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'index.js');

var config = {

    // We change to normal source mapping
    devtool: 'eval',
    entry: [
        'bootstrap-loader',
        './src'
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extension: ['', '.js', '.scss']
    },
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: "/build/"
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query:{
                    presets:['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            { test: /\.xml$/, loader: 'xml-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                //JSON LOADER
                test: /\.json$/,
                loader: "json-loader"
            },
            // handlebar template loader
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: 'imports?jQuery=jquery'
            }
        ]
    }
};

module.exports = config;
