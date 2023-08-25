"use client";

import { useState } from "react";

import styles from "./ScrollButton.module.css";

export function ScrollButton() {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.body.scrollTop;
		setVisible(scrolled > 100);
	};

	const scrollToTop = () => {
		document.body.scrollTo({
			behavior: "smooth",
			top: 0,
		});
	};

	document.body.addEventListener("scroll", toggleVisible, { passive: true });

	return (
		<button
			className={styles.scrollButton}
			onClick={scrollToTop}
			style={{ display: visible ? "flex" : "none" }}
			type="button"
		>
			Back to Top⬆
		</button>
	);
}
