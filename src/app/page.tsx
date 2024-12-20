import { Footer } from "~/components/Footer";
import { MainArea } from "~/components/MainArea";
import { OptionsForm } from "~/components/OptionsForm";
import { ResultDisplay } from "~/components/ResultDisplay";
import { ScrollButton } from "~/components/ScrollButton";
import { SearchParamsType, fetchData } from "~/utils/fetchData";

import { metadata as defaultMetadata } from "./layout";
import styles from "./page.module.css";

export interface HomeProps {
	searchParams: SearchParamsType;
}

export async function generateMetadata({ searchParams }: HomeProps) {
	const { options, result } = await fetchData(searchParams);
	const username = options.username || "";
	const packageCount = Array.isArray(result) ? result.length : 0;

	if (!username) {
		return defaultMetadata;
	}

	return {
		description: `${username} has ${packageCount} npm package${
			packageCount === 1 ? "" : "s"
		} eligible for Tidelift funding. 💸`,
		title: `${username} | Tidelift Me Up`,
	};
}

export default async function Home({ searchParams }: HomeProps) {
	const { options, result } = await fetchData(searchParams);

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
