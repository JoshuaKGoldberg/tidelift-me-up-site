"use client";

export function ScrollButton() {
	const scrollToTop = () => {
		document.body.scrollTo({
			behavior: "smooth",
			top: 0,
		});
	};

	return (
		<button onClick={scrollToTop} type="button">
			Back to Top⬆
		</button>
	);
}
