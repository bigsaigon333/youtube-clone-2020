const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
	entry: ["@babel/polyfill", ENTRY_FILE],
	devtool: "cheap-source-map",
	mode: MODE,
	plugins: [new MiniCssExtractPlugin({ filename: "styles.css" })],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{ loader: "babel-loader" }],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugin() {
								return [autoprefixer({ browsers: "cover 99.5%" })];
							},
						},
					},
					"sass-loader",
				],
			},
		],
	},
	output: { path: OUTPUT_DIR, filename: "[name].js" },
};

module.exports = config;