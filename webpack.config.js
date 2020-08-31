const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
	entry: ENTRY_FILE,
	mode: MODE,
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"scss-loader",
				],
			},
		],
	},
	output: { path: OUTPUT_DIR, filename: "[name].js" },
};

module.exports = config;
