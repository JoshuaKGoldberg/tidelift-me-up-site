import clsx from "clsx";

import styles from "./TableHead.module.css";

type TableOrder = "ascending" | "descending" | undefined;

type TableSort = "estimate" | "name" | undefined;

export interface TableHeadProps {
	order: TableOrder;
	setSortAndOrder: (received: TableSort) => void;
	showEstimates: boolean;
	sort: TableSort;
}

export function TableHead({
	order,
	setSortAndOrder,
	showEstimates,
	sort,
}: TableHeadProps) {
	return (
		<thead>
			<tr>
				<th className={styles.th}>
					<button
						className={clsx(
							styles.sortWidget,
							sort === "name" && styles.isActive,
						)}
						onClick={() => setSortAndOrder("name")}
					>
						Package Name
						{sort === "name" && (
							<span
								className={clsx(
									styles.caret,
									order === "descending" && styles.isDescending,
								)}
							>
								▾
							</span>
						)}
					</button>
				</th>
				{showEstimates ? (
					<th className={styles.th}>
						<div className={styles.centerAlignContainer}>
							<button
								className={clsx(
									styles.sortWidget,
									sort === "estimate" && styles.isActive,
								)}
								onClick={() => setSortAndOrder("estimate")}
							>
								Estimate
								{sort === "estimate" && (
									<span
										className={clsx(
											styles.caret,
											order === "descending" && styles.isDescending,
										)}
									>
										▾
									</span>
								)}
							</button>
						</div>
					</th>
				) : null}

				<th className={styles.th}>
					<div className={clsx(styles.centerAlignContainer, styles.label)}>
						Status
					</div>
				</th>
			</tr>
		</thead>
	);
}
