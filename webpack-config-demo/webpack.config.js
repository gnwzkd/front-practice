const path = require('path');
const htmlPlugin = new (require('html-webpack-plugin'))({
    template: path.join(__dirname, './src/index.html'),
    filename: 'index.html'
});

module.exports = {
    mode: 'development',
    plugins: [
        htmlPlugin
    ],
    module: {
        rules: [
            { test: /\.(js)|(jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader?sourceMap=true'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader?sourceMap=true&modules&localIdentName=[path][name]-[local]-[hash:5]', 'less-loader?sourceMap=true'] },
            { test: /\.(scss)|(sass)$/, use: ['style-loader', 'css-loader?sourceMap=true&modules&localIdentName=[path][name]-[local]-[hash:5]', 'sass-loader?sourceMap=true'] },
            {
                test: /\.(ttf)|(otf)|(svg)|(woff)|(woff2)|(eot)|(jpe?g)|(png)|(gif)|(bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
};
