const path = require('path')
const config = require('../config')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')


// 针对生产环境修改配置
const webpackConfig = merge(baseWebpackConfig, {

	devtool: '#cheap-module-eval-source-map',

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
	],

	devServer: {
		contentBase: config.develop.srcRoot,
	    historyApiFallback: true,
	    hot: true,
	    open: true,
	    inline: true,
	    disableHostCheck: true,
	    port: config.develop.port,
	    proxy: {
	    	'/proxy': {
	            // target: 'http://easy-mock.com/mock/598acde5a1d30433d85adfab/workerbook',
	            target: 'http://10.1.3.61:3333/api',
	            pathRewrite: {
	            	'/proxy': ''
	            },
	            changeOrigin: true,
	            secure: false,
	        },
	    }
	}
})

module.exports = webpackConfig