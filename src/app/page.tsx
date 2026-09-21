import { TideliftMeUpError } from "tidelift-me-up";

import { Footer } from "~/components/Footer";
import { MainArea } from "~/components/MainArea";
import { OptionsForm } from "~/components/OptionsForm";
import { ResultDisplay } from "~/components/ResultDisplay";
import { ScrollButton } from "~/components/ScrollButton";
import { DataResults, fetchData } from "~/utils/fetchData";
import { SearchParams, getOptions } from "~/utils/getOptions";
import { needsSubscribers } from "~/utils/needsSubscribers";

import { metadata as defaultMetadata } from "./layout";
import styles from "./page.module.css";

export interface HomeProps {
	searchParams: SearchParams;
}

export async function generateMetadata({ searchParams }: HomeProps) {
	const options = getOptions(searchParams);
	const username = options.username;

	if (!username) {
		return defaultMetadata;
	}

	const result = await fetchData(options);

	return {
		description: describeResult(username, result),
		title: `${username} | Tidelift Me Up`,
	};
}

function describeResult(username: string, result: DataResults) {
	if (Array.isArray(result)) {
		const withSubscribers = result.filter(
			(estimatedPackage) => !needsSubscribers(estimatedPackage),
		).length;

		return `${username} has ${result.length} npm package${
			result.length === 1 ? "" : "s"
		}; ${withSubscribers} with subscribers. 💸`;
	}

	if (result instanceof TideliftMeUpError) {
		return result.message;
	}

	return `Could not find packages for ${username}`;
}

export default async function Home({ searchParams }: HomeProps) {
	const options = getOptions(searchParams);
	const result = await fetchData(options);

	return (
		<>
			<MainArea as="main" className={styles.main}>
				<h1 className={styles.h1}>tidelift-me-up</h1>
				<p className={styles.p}>
					Check if your npm packages are eligible for Tidelift funding 💸
				</p>
				<OptionsForm options={options} />
				<ResultDisplay result={result} />
				<ScrollButton />
			</MainArea>
			<Footer />
		</>
	);
}
