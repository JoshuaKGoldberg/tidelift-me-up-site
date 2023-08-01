"use client";

export function ScrollButton() {
	const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		console.log("wheeeee", window);
		const href = e.currentTarget.href;
		const targetID = href.replace(/.*#/, "");
		const elem = document.getElementById(targetID);
		window.scrollTo({
			behavior: "smooth",

			top: 0,
		});
	};

	return (
		<button
			onClick={scrollToTop}
			type="button"
			// style={{ display: visible ? "inline" : "none" }}
		>
			Back to Top⬆
		</button>
	);
}
