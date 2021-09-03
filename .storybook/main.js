const path = require("path");

module.exports = {
  core: {
    builder: "storybook-builder-vite"
  },
  typescript: {
    check: false,
    checkOptions: {},
  },
  webpackFinal: async (config) => {
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes("svelte-loader")
    );
    svelteLoader.options.preprocess = require("svelte-preprocess")({});
    return config;
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      $app: path.resolve(__dirname, "../.svelte-kit/dev/runtime/app"),
      $lib: path.resolve(__dirname, "../src/lib"),
    };
    return config;
  },
  webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts)$/,
			use: [
				{
					options: {
						// Provide the path to your tsconfig.json so that your stories can
						// display types from outside each individual story.
						tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
					},
				},
			],
		});
		config.resolve.extensions.push(".ts");
		return config
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
  ],
  svelteOptions: {
    preprocess: import("../svelte.config.js").preprocess,
  },
};
