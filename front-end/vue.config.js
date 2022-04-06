const { defineConfig } = require('@vue/cli-service')
module.exports = {
	devServer: {
		//host: "cp4.tp260.click",
		//proxy: 'https://cp4.tp260.click:3000'
		proxy: 'http://localhost:3000'
	}
}
