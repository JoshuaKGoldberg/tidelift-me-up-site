import { Footer } from "~/components/Footer";
import { MainArea } from "~/components/MainArea";
import { OptionsForm } from "~/components/OptionsForm";
import { ResultDisplay } from "~/components/ResultDisplay";
import { ScrollButton } from "~/components/ScrollButton";
import { fetchData } from "~/utils/fetchData";
import { SearchParams, getOptions } from "~/utils/getOptions";

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

	const description = Array.isArray(result)
		? `${username} has ${result.length} npm package${
				result.length === 1 ? "" : "s"
		  } eligible for Tidelift funding. 💸`
		: `Could not find packages for ${username}`;

	return {
		description,
		title: `${username} | Tidelift Me Up`,
	};
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
