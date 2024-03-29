"use client";

import { useState } from "react";
import { EstimatedPackage } from "tidelift-me-up";

import { Estimate } from "./Estimate";
import styles from "./ResultDisplay.module.css";
import { ResultsContainer } from "./ResultsContainer";
import { TableHead } from "./TableHead";

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
	const [order, setOrder] = useState<"ascending" | "descending">();

	function setSortAndOrder(received: typeof sort) {
		if (received === sort) {
			setOrder(order === "ascending" ? "descending" : "ascending");
		} else {
			setSort(received);
			setOrder("ascending");
		}
	}

	const showEstimates = result.some(
		(packageEstimate) => !packageEstimate.lifted,
	);

	return (
		<ResultsContainer
			heading={`${counted(
				result.length,
				`${showEstimates ? "Liftable" : "Lifted"} Package`,
			)} Found`}
		>
			{showEstimates && (
				<p className={styles.p}>
					With an unclaimed funding estimate of{" "}
					<b>~${sumEstimateFunding(result)}</b>
				</p>
			)}
			<table className={styles.estimates}>
				<TableHead
					order={order}
					setSortAndOrder={setSortAndOrder}
					showEstimates={showEstimates}
					sort={sort}
				/>
				<tbody>
					{result
						.sort((a, b) => {
							const aMoney = a.lifted ? 0 : a.estimatedMoney;
							const bMoney = b.lifted ? 0 : b.estimatedMoney;
							let compared: number;
							switch (sort) {
								case "estimate":
									compared = aMoney - bMoney;
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
											? aMoney === bMoney
												? a.name.localeCompare(b.name)
												: bMoney - aMoney
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
								showEstimates={showEstimates}
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
		.filter((estimate) => !estimate.lifted)
		.reduce(
			(total, current) =>
				current.lifted ? total : total + current.estimatedMoney,
			0,
		)
		.toLocaleString("en-US", {
			maximumFractionDigits: 0,
		});
	return total;
}
