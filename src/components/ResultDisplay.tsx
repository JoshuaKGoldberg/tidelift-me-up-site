"use client";

import { useState } from "react";
import { EstimatedPackage } from "tidelift-me-up";

import { needsSubscribers } from "../utils/needsSubscribers";
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

	const [sort, setSort] = useState<"estimate" | "name">();
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
	const unclaimedFunding = sumEstimateFunding(result);
	const withSubscribers = result.filter(
		(packageEstimate) => !needsSubscribers(packageEstimate),
	).length;

	return (
		<ResultsContainer
			heading={`${counted(
				result.length,
				"Package",
			)}; ${withSubscribers} With Subscribers`}
		>
			{showEstimates && unclaimedFunding > 0 && (
				<p className={styles.p}>
					With an unclaimed funding estimate of{" "}
					<b>
						~$
						{unclaimedFunding.toLocaleString("en-US", {
							maximumFractionDigits: 0,
						})}
					</b>
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
							const aGroup = sortGroup(a);
							const bGroup = sortGroup(b);
							if (aGroup !== bGroup) {
								return aGroup - bGroup;
							}

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
								case undefined:
									compared =
										aMoney === bMoney
											? a.name.localeCompare(b.name)
											: bMoney - aMoney;
									break;
							}

							return order === "descending" ? -compared : compared;
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

function sortGroup(estimatedPackage: EstimatedPackage) {
	if (needsSubscribers(estimatedPackage)) {
		return 2;
	}

	return estimatedPackage.lifted ? 1 : 0;
}

function counted(count: number, text: string) {
	return `${count} ${text}${count === 1 ? "" : "s"}`;
}

function sumEstimateFunding(packages: EstimatedPackage[]) {
	return packages.reduce(
		(total, current) =>
			current.lifted ? total : total + current.estimatedMoney,
		0,
	);
}
