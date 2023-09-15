import { EstimatedPackage } from "tidelift-me-up";

import { Anchor } from "./Anchor";
import { CallToAction } from "./CallToAction";
import styles from "./Estimate.module.css";

export interface EstimateProps {
	estimatedPackage: EstimatedPackage;
}

export function Estimate({ estimatedPackage }: EstimateProps) {
	const {
		data: { description },
		estimatedMoney,
		lifted,
		name,
	} = estimatedPackage;
	const href = `https://tidelift.com/lifter/search/npm/${encodeURIComponent(
		name,
	)}`;

	return (
		<tr className={styles.estimate}>
			<td className={styles.nameCell}>
				<Anchor
					className={styles.name}
					href={`https://www.npmjs.com/package/${name}`}
					target="_blank"
				>
					{name}
				</Anchor>
				<em className={styles.description}>{description}</em>
			</td>
			<td className={styles.moneyCell}>
				<div>~${Math.round(estimatedMoney)}</div>
			</td>
			<td className={styles.liftedCell}>
				{lifted ? (
					<Anchor href={href} target="_blank">
						Lifted
					</Anchor>
				) : (
					<CallToAction as="a" href={href} target="_blank">
						Ready to Lift
					</CallToAction>
				)}
			</td>
		</tr>
	);
}
