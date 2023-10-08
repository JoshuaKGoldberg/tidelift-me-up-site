import { Anchor } from "./Anchor";
import styles from "./Footer.module.css";
import { MainArea } from "./MainArea";

export function Footer() {
	return (
		<MainArea as="footer" className={styles.footer}>
			Designed with 💙 by{" "}
			<Anchor href="https://joshuakgoldberg.com" target="_blank">
				Josh Goldberg
			</Anchor>{" "}
			and{" "}
			<Anchor href="https://kgrayson.com" target="_blank">
				Kathryn Grayson Nanz
			</Anchor>
			.
			<br />
			<br />
			<Anchor
				href="https://github.com/JoshuaKGoldberg/tidelift-me-up"
				target="_blank"
			>
				CLI repo
			</Anchor>{" "}
			/{" "}
			<Anchor
				href="https://github.com/JoshuaKGoldberg/tidelift-me-up-site"
				target="_blank"
			>
				Website repo
			</Anchor>
		</MainArea>
	);
}
