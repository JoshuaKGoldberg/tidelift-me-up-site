import { PackageEstimate } from "tidelift-me-up";

import styles from "./ResultDisplay.module.css";

export interface ResultDisplayProps {
	result: Error | PackageEstimate[] | undefined;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
	if (!result) {
		return null;
	}

	if (Array.isArray(result) && !result.length) {
		return <div className={styles.resultDisplay}>No results...</div>;
	}

	return (
		<div className={styles.resultDisplay}>
			<h3>Displaying results nicely is a work in progress :)</h3>
			<pre>
				<code>
					{result instanceof Error
						? result.stack
						: JSON.stringify(result, null, 4)}
				</code>
			</pre>
		</div>
	);
}
