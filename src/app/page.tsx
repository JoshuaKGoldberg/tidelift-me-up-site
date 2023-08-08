import { EstimatedPackage, tideliftMeUp } from "tidelift-me-up";
import { PackageOwnership } from "tidelift-me-up";

import { Footer } from "~/components/Footer";
import { MainArea } from "~/components/MainArea";
import { OptionsForm } from "~/components/OptionsForm";
import { ResultDisplay } from "~/components/ResultDisplay";
import { ScrollButton } from "~/components/ScrollButton";

import styles from "./page.module.css";

export interface HomeProps {
	searchParams: Record<string, unknown>;
}

export default async function Home({ searchParams }: HomeProps) {
	const options = {
		ownership: searchParams["ownership"] as PackageOwnership[],
		since: (searchParams["since"] || undefined) as string | undefined,
		username: searchParams["username"] as string,
	};
	let result: Error | EstimatedPackage[] | undefined;

	try {
		result = options.username ? await tideliftMeUp(options) : undefined;
	} catch (error) {
		result = error as Error;
	}

	return (
		<>
			<ScrollButton />
			<MainArea as="main" className={styles.main}>
				<h1 className={styles.h1}>tidelift-me-up</h1>
				<p className={styles.p}>
					Find your npm packages eligible for Tidelift funding 💸
				</p>
				<OptionsForm options={options} />
				<ResultDisplay result={result} />
			</MainArea>
			<Footer />
		</>
	);
}
