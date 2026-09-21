import { EstimatedPackage } from "tidelift-me-up";

// Tidelift doesn't yet estimate income for packages without enough subscribers
export function needsSubscribers(estimatedPackage: EstimatedPackage) {
	return !estimatedPackage.lifted && estimatedPackage.estimatedMoney === 0;
}
