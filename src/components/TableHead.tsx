import clsx from "clsx";

import styles from "./TableHead.module.css";

type TableOrder = "ascending" | "descending" | undefined;

type TableSort = "estimate" | "lifted" | "name" | undefined;

export interface TableHeadProps {
	order: TableOrder;
	setSortAndOrder: (received: TableSort) => void;
	sort: TableSort;
}

export function TableHead({ order, setSortAndOrder, sort }: TableHeadProps) {
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

				<th className={styles.th}>
					<div className={styles.centerAlignContainer}>
						<button
							className={clsx(
								styles.sortWidget,
								sort === "lifted" && styles.isActive,
							)}
							onClick={() => setSortAndOrder("lifted")}
						>
							Status
							{sort === "lifted" && (
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
			</tr>
		</thead>
	);
}
