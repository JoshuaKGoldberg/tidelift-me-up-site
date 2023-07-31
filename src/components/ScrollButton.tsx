"use client";

import { useState } from "react";

export function ScrollButton() {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 100) {
			setVisible(true);
		} else if (scrolled <= 100) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			behavior: "smooth",
			top: 0,
		});
	};

	window.addEventListener("scroll", toggleVisible);

	return (
		<button
			onClick={scrollToTop}
			style={{ display: visible ? "inline" : "none" }}
		>
			⬆️
		</button>
	);
}
