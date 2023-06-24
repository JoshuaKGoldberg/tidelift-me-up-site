import { PackageEstimate } from "tidelift-me-up";

import { Estimate } from "./Estimate";
import styles from "./ResultDisplay.module.css";
import { ResultsContainer } from "./ResultsContainer";

export interface ResultDisplayProps {
	result: Error | PackageEstimate[] | undefined;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
	if (!result) {
		return null;
	}

	if (Array.isArray(result) && !result.length) {
		return (
			<ResultsContainer heading="No results...">
				<p className={styles.p}>Ah well!</p>
			</ResultsContainer>
		);
	}

	if (result instanceof Error) {
		return (
			<ResultsContainer heading="Oh no! Error!">
				<pre className={styles.error}>
					<code>{result.stack}</code>
				</pre>
			</ResultsContainer>
		);
	}

	return (
		<ResultsContainer heading={`${counted(result.length, "Package")} Found`}>
			<em>(tidying this up is WIP - coming soon!)</em>
			{(
				[
					[result.filter((result) => !result.lifted), "Not Yet Lifted"],
					[result.filter((result) => result.lifted), "Already Lifted"],
				] as const
			).map(([estimates, subHeading]) => (
				<div className={styles.section} key={subHeading}>
					<h4 className={styles.subHeading}>{subHeading}</h4>
					<ul className={styles.estimates}>
						{estimates
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((packageEstimate) => (
								<Estimate data={packageEstimate} key={packageEstimate.name} />
							))}
					</ul>
				</div>
			))}
		</ResultsContainer>
	);
}

function counted(count: number, text: string) {
	return `${count} ${text}${count === 1 ? "" : "s"}`;
}
