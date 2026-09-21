import { EstimatedPackage } from "tidelift-me-up";

export function needsSubscribers(estimatedPackage: EstimatedPackage) {
	return !estimatedPackage.lifted && estimatedPackage.estimatedMoney === 0;
}
