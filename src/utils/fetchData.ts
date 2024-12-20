import {
	EstimatedPackage,
	PackageOwnership,
	tideliftMeUp,
} from "tidelift-me-up";

export type OptionsType = Record<string, unknown>;
export type SearchParamsType = Record<string, unknown>;

export async function fetchData(searchParams: SearchParamsType) {
	const options = getOptions(searchParams);
	const result = await getTideliftData(options);
	return { options, result };
}

function getOptions(searchParams: SearchParamsType) {
	return {
		ownership: undefinedIfEmpty(
			[
				searchParams.author === "on" && "author",
				searchParams.maintainer === "on" && "maintainer",
				searchParams.publisher === "on" && "publisher",
			].filter(Boolean) as PackageOwnership[],
		),
		since: (searchParams.since || undefined) as string | undefined,
		username: searchParams.username as string,
	};
}

async function getTideliftData(options: OptionsType) {
	let result: Error | EstimatedPackage[] | undefined;

	try {
		result = options.username ? await tideliftMeUp(options) : undefined;
	} catch (error) {
		result = error as Error;
	}

	return result;
}

function undefinedIfEmpty<T>(items: T[]) {
	return items.length === 0 ? undefined : items;
}
