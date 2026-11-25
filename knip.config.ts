import type { KnipConfig } from "knip";

export default {
	ignoreExportsUsedInFile: { interface: true, type: true },
	project: ["src/**/*.ts!", "src/**/*.tsx!"],
	treatConfigHintsAsErrors: true,
} satisfies KnipConfig;
