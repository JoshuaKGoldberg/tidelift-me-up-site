import NodeCache from "node-cache";
import { EstimatedPackage, tideliftMeUp } from "tidelift-me-up";

export type DataOptions = Record<string, unknown>;
export type DataResults = Error | EstimatedPackage[] | undefined;

const cache = new NodeCache();

export async function fetchData(options: DataOptions) {
	const cacheKey = JSON.stringify(options);

	if (cache.has(cacheKey)) {
		return cache.get<DataResults>(cacheKey);
	}

	let result: DataResults;

	try {
		result = options.username ? await tideliftMeUp(options) : undefined;
		cache.set(cacheKey, result);
	} catch (error) {
		result = error as Error;
	}

	return result;
}
