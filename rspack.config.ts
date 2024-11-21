import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	devServer: {
    historyApiFallback: true,
  },
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"],
		alias: {
			'@': `${__dirname}/src`
		}
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
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	experiments: {
		css: true
	}
});