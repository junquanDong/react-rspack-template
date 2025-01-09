import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	devServer: {
    historyApiFallback: true,
		allowedHosts: "all",
  },
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	output: {
		filename: "[name].[contenthash].js",
		chunkFilename: "[name].[contenthash].js",
		// 构建时清除输出目录
		clean: true,
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
		alias: {
			'@': `${__dirname}/src`,
			'@modules': `${__dirname}/src/redux/modules`
		},
		modules: [`${__dirname}/src`, 'node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true,
									dynamicImport: true,
									decorators: true,

								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									},
									legacyDecorator: true,
									decoratorMetadata: true,
									
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
		isDev ? new RefreshPlugin() : null
	].filter(Boolean),
	optimization: {
		// tree shaking
		usedExports: true,
		// code splitting
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	
	experiments: {
		css: true
	},
	// externals: {
	// 	react: "React",
	// 	"react-dom": "ReactDOM"
	// }
});
