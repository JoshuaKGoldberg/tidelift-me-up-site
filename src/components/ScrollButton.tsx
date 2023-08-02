"use client";

import Link from "next/link";

export function ScrollButton() {
	const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		const href = e.currentTarget.href;
		console.log("href:", href);
		const targetID = href.replace(/.*#/, "");
		console.log("targetID:", targetID);
		const elem = document.getElementById(targetID);
		console.log("elem:", elem);
		window.scrollTo({
			top: elem?.getBoundingClientRect().top,
			// eslint-disable-next-line perfectionist/sort-objects
			behavior: "smooth",
		});
	};

	return (
		<Link
			href="#title"
			onClick={scrollToTop}
			type="button"
			// style={{ display: visible ? "inline" : "none" }}
		>
			Back to Top⬆
		</Link>
	);
}
