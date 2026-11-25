// 👋 Hi! This is an optional config file for create-typescript-app (CTA).
// Repos created with CTA or its underlying framework Bingo don't use one by default.
// A CTA config file allows automatic updates to the repo that preserve customizations.
// For more information, see Bingo's docs:
//   https://www.create.bingo/execution#transition-mode
// Eventually these values should be inferable, making this config file unnecessary:
//   https://github.com/JoshuaKGoldberg/bingo/issues/128
import {
	blockCodecov,
	blockCTATransitions,
	blockESLint,
	blockReleaseIt,
	blockSideEffects,
	blockTSDown,
	blockVitest,
	createConfig,
} from "create-typescript-app";

export default createConfig({
	refinements: {
		blocks: {
			add: [blockCTATransitions],
			exclude: [
				blockCodecov,
				blockReleaseIt,
				blockSideEffects,
				blockTSDown,
				blockVitest,
			],
		},
		extensions: [
			blockESLint({
				extensions: [
					{
						extends: ["jsxA11y.flatConfigs.recommended"],
						files: ["**/*.{js,ts}"],
						rules: [{ entries: { "n/no-missing-import": "off" } }],
					},
				],
				imports: [
					{
						source: {
							packageName: "eslint-plugin-jsx-a11y",
							version: "6.10.2",
						},
						specifier: "jsxA11y",
					},
				],
			}),
		],
	},
});
