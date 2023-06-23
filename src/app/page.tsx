import { PackageEstimate, tideliftMeUp } from "tidelift-me-up";
import { PackageOwnership } from "tidelift-me-up";

import styles from "./page.module.css";
import { ResultDisplay } from "~/components/ResultDisplay";
import { OptionsForm } from "~/components/OptionsForm";

export interface HomeProps {
	searchParams: Record<string, unknown>;
}

export default async function Home({ searchParams }: HomeProps) {
	const options = {
		username: searchParams["username"] as string,
		since: (searchParams["since"] || undefined) as string | undefined,
		ownership: searchParams["ownership"] as PackageOwnership[],
	};
	let result: Error | PackageEstimate[] | undefined;

	try {
		result = options.username ? await tideliftMeUp(options) : undefined;
	} catch (error) {
		result = error as Error;
	}

	return (
		<>
			<main className={styles.main}>
				<h1 className={styles.h1}>tidelift-me-up</h1>
				<p className={styles.p}>
					Find your npm packages eligible for Tidelift funding 💸
				</p>
				<OptionsForm options={options} />
				<ResultDisplay result={result} />
			</main>
			<footer className={styles.footer}>
				Designed with 💙 by{" "}
				<a href="https://joshuakgoldberg.com" target="_blank">
					Josh Goldberg
				</a>{" "}
				and{" "}
				<a href="" target="_blank">
					Kathryn Grayson Nanz
				</a>
				.
				<br />
				<br />
				<a
					href="https://github.com/JoshuaKGoldberg/tidelift-me-up"
					target="_blank"
				>
					CLI repo
				</a>{" "}
				/{" "}
				<a
					href="https://github.com/JoshuaKGoldberg/tidelift-me-up-site"
					target="_blank"
				>
					Website repo
				</a>
			</footer>
		</>
	);
}
