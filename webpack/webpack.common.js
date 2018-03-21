const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

const utils = require('./utils.js');

module.exports = (options) => ({
    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],
        alias: rxPaths()
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    caseSensitive: true,
                    removeAttributeQuotes:false,
                    minifyJS:false,
                    minifyCSS:false
                },
                exclude: ['./src/main/webapp/index.html']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
                loaders: ['file-loader?hash=sha512&digest=hex&name=content/[hash].[ext]']
            },
            {
                test: /manifest.webapp$/,
                loader: 'file-loader?name=manifest.webapp!web-app-manifest-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${options.env}'`,
                BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
                VERSION: `'${utils.parseVersion()}'`,
                DEBUG_INFO_ENABLED: options.env === 'development',
                // The root URL for API calls, ending with a '/' - for example: `"http://www.jhipster.tech:8081/myservice/"`.
                // If this URL is left empty (""), then it will be relative to the current context.
                // If you use an API server, in `prod` mode, you will need to enable CORS
                // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
                SERVER_API_URL: `''`
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: module => utils.isExternalLib(module)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['manifest'],
            minChunks: Infinity,
        }),
        /**
         * See: https://github.com/angular/angular/issues/11580
         */
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            utils.root('src/main/webapp/app'), {}
        ),
        new CopyWebpackPlugin([
            { from: './node_modules/swagger-ui/dist/css', to: 'swagger-ui/dist/css' },
            { from: './node_modules/swagger-ui/dist/lib', to: 'swagger-ui/dist/lib' },
            { from: './node_modules/swagger-ui/dist/swagger-ui.min.js', to: 'swagger-ui/dist/swagger-ui.min.js' },
            { from: './src/main/webapp/swagger-ui/', to: 'swagger-ui' },
            { from: './src/main/webapp/favicon.ico', to: 'favicon.ico' },
            { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
            // jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
            { from: './src/main/webapp/robots.txt', to: 'robots.txt' }
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/ar-ly/*.json", fileName: "./i18n/ar-ly.json" },
                    { pattern: "./src/main/webapp/i18n/hy/*.json", fileName: "./i18n/hy.json" },
                    { pattern: "./src/main/webapp/i18n/ca/*.json", fileName: "./i18n/ca.json" },
                    { pattern: "./src/main/webapp/i18n/zh-cn/*.json", fileName: "./i18n/zh-cn.json" },
                    { pattern: "./src/main/webapp/i18n/zh-tw/*.json", fileName: "./i18n/zh-tw.json" },
                    { pattern: "./src/main/webapp/i18n/cs/*.json", fileName: "./i18n/cs.json" },
                    { pattern: "./src/main/webapp/i18n/da/*.json", fileName: "./i18n/da.json" },
                    { pattern: "./src/main/webapp/i18n/nl/*.json", fileName: "./i18n/nl.json" },
                    { pattern: "./src/main/webapp/i18n/et/*.json", fileName: "./i18n/et.json" },
                    { pattern: "./src/main/webapp/i18n/fa/*.json", fileName: "./i18n/fa.json" },
                    { pattern: "./src/main/webapp/i18n/fr/*.json", fileName: "./i18n/fr.json" },
                    { pattern: "./src/main/webapp/i18n/gl/*.json", fileName: "./i18n/gl.json" },
                    { pattern: "./src/main/webapp/i18n/de/*.json", fileName: "./i18n/de.json" },
                    { pattern: "./src/main/webapp/i18n/el/*.json", fileName: "./i18n/el.json" },
                    { pattern: "./src/main/webapp/i18n/hi/*.json", fileName: "./i18n/hi.json" },
                    { pattern: "./src/main/webapp/i18n/hu/*.json", fileName: "./i18n/hu.json" },
                    { pattern: "./src/main/webapp/i18n/id/*.json", fileName: "./i18n/id.json" },
                    { pattern: "./src/main/webapp/i18n/it/*.json", fileName: "./i18n/it.json" },
                    { pattern: "./src/main/webapp/i18n/ja/*.json", fileName: "./i18n/ja.json" },
                    { pattern: "./src/main/webapp/i18n/ko/*.json", fileName: "./i18n/ko.json" },
                    { pattern: "./src/main/webapp/i18n/mr/*.json", fileName: "./i18n/mr.json" },
                    { pattern: "./src/main/webapp/i18n/pl/*.json", fileName: "./i18n/pl.json" },
                    { pattern: "./src/main/webapp/i18n/pt-br/*.json", fileName: "./i18n/pt-br.json" },
                    { pattern: "./src/main/webapp/i18n/pt-pt/*.json", fileName: "./i18n/pt-pt.json" },
                    { pattern: "./src/main/webapp/i18n/ro/*.json", fileName: "./i18n/ro.json" },
                    { pattern: "./src/main/webapp/i18n/ru/*.json", fileName: "./i18n/ru.json" },
                    { pattern: "./src/main/webapp/i18n/sk/*.json", fileName: "./i18n/sk.json" },
                    { pattern: "./src/main/webapp/i18n/sr/*.json", fileName: "./i18n/sr.json" },
                    { pattern: "./src/main/webapp/i18n/es/*.json", fileName: "./i18n/es.json" },
                    { pattern: "./src/main/webapp/i18n/sv/*.json", fileName: "./i18n/sv.json" },
                    { pattern: "./src/main/webapp/i18n/tr/*.json", fileName: "./i18n/tr.json" },
                    { pattern: "./src/main/webapp/i18n/ta/*.json", fileName: "./i18n/ta.json" },
                    { pattern: "./src/main/webapp/i18n/th/*.json", fileName: "./i18n/th.json" },
                    { pattern: "./src/main/webapp/i18n/ua/*.json", fileName: "./i18n/ua.json" },
                    { pattern: "./src/main/webapp/i18n/vi/*.json", fileName: "./i18n/vi.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/main/webapp/index.html',
            chunksSortMode: 'dependency',
            inject: 'body'
        })
    ]
});
