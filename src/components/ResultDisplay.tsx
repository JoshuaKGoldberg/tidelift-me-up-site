"use client";
import { useState } from "react";
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

	const [sort, setSort] = useState<"estimate" | "lifted" | "name">();
	const [order, setOrder] = useState<"ascending" | "descending">("ascending");

	function setSortAndOrder(received: typeof sort) {
		if (received === sort) {
			setOrder(order === "ascending" ? "descending" : "ascending");
		} else {
			setSort(received);
			setOrder("ascending");
		}
	}

	return (
		<ResultsContainer
			heading={`${counted(result.length, "Liftable Package")} Found`}
		>
			<p className={styles.p}>
				With a funding estimate of <b>~${sumEstimateFunding(result)}</b>
			</p>
			<table className={styles.estimates}>
				<thead>
					<tr>
						<th className={styles.th}>
							Package Name
							<button onClick={() => setSortAndOrder("name")}>Sort</button>
						</th>
						<th className={styles.th}>
							Estimate
							<button onClick={() => setSortAndOrder("estimate")}>Sort</button>
						</th>
						<th className={styles.th}>
							Status
							<button onClick={() => setSortAndOrder("lifted")}>Sort</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{result
						.sort((a, b) => {
							let compared: number;

							switch (sort) {
								case "estimate":
									compared = a.estimatedMoney - b.estimatedMoney;
									break;
								case "name":
									compared = a.name.localeCompare(b.name);
									break;
								case "lifted":
									compared = a.lifted ? (b.lifted ? 0 : -1) : b.lifted ? 1 : 0;
									break;
								case undefined:
									compared =
										a.lifted === b.lifted
											? a.estimatedMoney === b.estimatedMoney
												? a.name.localeCompare(b.name)
												: b.estimatedMoney - a.estimatedMoney
											: a.lifted
											? 1
											: -1;
									break;
							}

							return order === "ascending" ? compared : -compared;
						})
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

function sumEstimateFunding(packages: EstimatedPackage[]) {
	const total = packages
		.reduce((total, current) => total + current.estimatedMoney, 0)
		.toLocaleString("en-US", {
			maximumFractionDigits: 0,
		});
	return total;
}

// todo: figure out ascending & descending
// original state is sorted by:
// - lifted (bool falsy)
// - estimate (num descending)
// - name (string ascending)

// make three click handlers
// make a 'handle next click' func to switch from asc to desc
// make initial state an object with thead and asc or desc
// useReducer?
