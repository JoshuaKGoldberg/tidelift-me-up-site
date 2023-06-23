import { PackageEstimate } from "tidelift-me-up";

import styles from "./Estimate.module.css";

export interface EstimateProps {
	data: PackageEstimate;
}

export function Estimate({ data }: EstimateProps) {
	return (
		<li className={styles.estimate}>
			<a
				className={styles.name}
				href={`https://www.npmjs.com/package/${data.name}`}
				target="_blank"
			>
				{data.name}
			</a>
			<div className={styles.money}>~${data.estimatedMoney}</div>
			<div className={styles.lifted}>{data.lifted ? "yay" : "ooh"}</div>
		</li>
	);
}
