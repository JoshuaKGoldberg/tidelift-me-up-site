import { PackageOwnership } from "tidelift-me-up";

import { CallToAction } from "./CallToAction";
import styles from "./OptionsForm.module.css";

export interface FormOptions {
	ownership?: PackageOwnership[];
	since?: string;
	username?: string;
}

export interface OptionsFormProps {
	options: FormOptions;
}

export function OptionsForm({ options }: OptionsFormProps) {
	const ownerships = new Set(options.ownership);

	return (
		<form className={styles.optionsForm}>
			<div className={styles.primaryOptions}>
				<div className={styles.usernameArea}>
					<label className={styles.labelPrimary} htmlFor="username">
						Search an npm username
					</label>
					<input
						className={styles.inputPrimary}
						defaultValue={options.username}
						id="username"
						name="username"
						required
						type="text"
					></input>
				</div>

				<CallToAction as="button" className={styles.submit} type="submit">
					Search
				</CallToAction>
			</div>

			<div className={styles.secondaryOptionsArea}>
				<h2 className={styles.h2}>optionally, filter by:</h2>
				<div className={styles.secondaryOptions}>
					<div className={styles.secondaryOptionArea}>
						<label className={styles.labelSecondary} htmlFor="since">
							Updated Since
						</label>
						<input
							className={styles.inputSecondary}
							defaultValue={options.since && options.since.toString()}
							id="since"
							name="since"
							type="date"
						></input>
					</div>

					<fieldset className={styles.secondaryOptionArea} name="ownership">
						<legend className={styles.legendSecondary}>
							Relationship to Project
						</legend>
						<div className={styles.fieldsetOptions}>
							{(["author", "maintainer", "publisher"] as const).map(
								(ownershipForm) => (
									<div className={styles.secondaryOption} key={ownershipForm}>
										<input
											defaultChecked={ownerships.has(ownershipForm)}
											id={ownershipForm}
											name={ownershipForm}
											type="checkbox"
										/>
										<label htmlFor={ownershipForm}>
											{upperFirst(ownershipForm)}
										</label>
									</div>
								)
							)}
						</div>
					</fieldset>
				</div>
			</div>
		</form>
	);
}

function upperFirst(text: string) {
	return text[0].toUpperCase() + text.slice(1);
}
