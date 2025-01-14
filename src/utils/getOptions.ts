import { PackageOwnership } from "tidelift-me-up";

export type SearchParams = Record<string, unknown>;

export function getOptions(searchParams: SearchParams) {
	return {
		ownership: undefinedIfEmpty(
			[
				searchParams.author === "on" && "author",
				searchParams.maintainer === "on" && "maintainer",
				searchParams.publisher === "on" && "publisher",
			].filter(Boolean) as PackageOwnership[],
		),
		since: (searchParams.since || undefined) as string | undefined,
		username: (searchParams.username || "") as string,
	};
}

function undefinedIfEmpty<T>(items: T[]) {
	return items.length === 0 ? undefined : items;
}
