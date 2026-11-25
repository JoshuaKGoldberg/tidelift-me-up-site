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
	blockDevelopmentDocs,
	blockESLint,
	blockGitHubActionsCI,
	blockKnip,
	blockNextJs,
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
				blockNextJs,
				blockReleaseIt,
				blockSideEffects,
				blockTSDown,
				blockVitest,
			],
		},
		extensions: [
			blockDevelopmentDocs({
				sections: {
					Building: {
						contents: `
Run [Next.js](https://nextjs.org) locally to start a development server that rebuilds as you save files:

\`\`\`shell
pnpm dev
\`\`\`
`,
						innerSections: [
							{
								contents: `
Run Next.js to create an optimized production build in \`.next/\`:

\`\`\`shell
pnpm build
\`\`\`

Then start a server for that production build:

\`\`\`shell
pnpm start
\`\`\`
`,
								heading: "Production Builds",
							},
						],
					},
				},
			}),
			blockESLint({
				extensions: [
					{
						extends: [
							"jsxA11y.flatConfigs.recommended",
							'next.configs["core-web-vitals"]',
						],
						files: ["**/*.{js,ts}"],
						rules: [{ entries: { "n/no-missing-import": "off" } }],
					},
				],
				ignores: [".next", "next-env.d.ts"],
				imports: [
					{
						source: "@next/eslint-plugin-next",
						specifier: "next",
					},
					{
						source: {
							packageName: "eslint-plugin-jsx-a11y",
							version: "6.10.2",
						},
						specifier: "jsxA11y",
					},
				],
				scriptFileExtensions: ["tsx"],
			}),
			blockGitHubActionsCI({
				jobs: [
					{
						name: "Build",
						steps: [{ run: "pnpm build" }],
					},
				],
			}),
			blockKnip({
				project: ["src/**/*.tsx!"],
			}),
		],
	},
});
