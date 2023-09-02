import { EstimatedPackage } from "tidelift-me-up";

import { Estimate } from "./Estimate";
import styles from "./ResultDisplay.module.css";
import { ResultsContainer } from "./ResultsContainer";

export interface ResultDisplayProps {
	result: Error | EstimatedPackage[] | undefined;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
	if (!result) {
		return null;
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

	if (!result.length) {
		return (
			<ResultsContainer heading="No results...">
				<p className={styles.p}>Ah well!</p>
			</ResultsContainer>
		);
	}

	return (
		<ResultsContainer
			heading={`${counted(result.length, "Liftable Package")} Found`}
		>
			<table className={styles.estimates}>
				<thead>
					<tr>
						<th className={styles.th}>Package Name</th>
						<th className={styles.th}>Estimate</th>
						<th className={styles.th}>Status</th>
					</tr>
				</thead>
				<tbody>
					{result
						.sort((a, b) =>
							a.lifted === b.lifted
								? a.estimatedMoney === b.estimatedMoney
									? a.name.localeCompare(b.name)
									: b.estimatedMoney - a.estimatedMoney
								: a.lifted
								? 1
								: -1,
						)
						.map((packageEstimate) => (
							<Estimate
								estimatedPackage={packageEstimate}
								key={packageEstimate.name}
							/>
						))}
				</tbody>
			</table>
		</ResultsContainer>
	);
}

function counted(count: number, text: string) {
	return `${count} ${text}${count === 1 ? "" : "s"}`;
}
