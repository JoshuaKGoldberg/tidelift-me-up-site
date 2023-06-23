import styles from "./ResultsContainer.module.css";

export interface ResultsContainerProps extends React.PropsWithChildren {
	heading: React.ReactNode;
}

export function ResultsContainer({ children, heading }: ResultsContainerProps) {
	return (
		<div className={styles.resultsContainer}>
			<h3 className={styles.h3}>{heading}</h3>
			{children}
		</div>
	);
}
