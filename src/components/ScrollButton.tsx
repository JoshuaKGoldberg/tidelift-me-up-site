"use client";

export function ScrollButton() {
	const scrollToTop = () => {
		console.log("wheeeee", window);
		window.scrollTo({
			behavior: "smooth",
			left: 0,
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
