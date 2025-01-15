import { cache } from "react";
import { EstimatedPackage, tideliftMeUp } from "tidelift-me-up";

export type DataOptions = Record<string, unknown>;
export type DataResults = Error | EstimatedPackage[] | undefined;

export const fetchData = cache(
	async (options: DataOptions): Promise<DataResults> => {
		let result: DataResults;

		try {
			result = options.username ? await tideliftMeUp(options) : undefined;
		} catch (error) {
			result = error as Error;
		}

		return result;
	},
);
