"use client";

import clsx from "clsx";
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

	if (typeof document !== "undefined") {
		document.body.addEventListener("scroll", toggleVisible, { passive: true });
	}

	return (
		<button
			className={clsx(styles.scrollButton, visible && styles.visible)}
			onClick={scrollToTop}
			type="button"
		>
			Back to Top ⬆
		</button>
	);
}
