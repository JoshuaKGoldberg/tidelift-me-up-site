import { ImageResponse } from "next/og";

import { metadata } from "./layout";

export const alt = metadata.title;

export const contentType = "image/png";

export const size = {
	height: 630,
	width: 1200,
};

// Colors are copied from the light theme in globals.css.
// CSS variables aren't available when rendering to an image.
const colors = {
	background: "#fdfafa",
	boldBottom: "#0e4c3c",
	boldTop: "#035e63",
	foreground: "#073535",
	subtleBottom: "#e9fff2",
	subtleTop: "#ddfbff",
};

// Loads a Google Font as a font file usable by the image renderer.
// See https://nextjs.org/docs/app/api-reference/functions/image-response
// Global fetch is available in the Node.js versions supported by Next.js.
/* eslint-disable n/no-unsupported-features/node-builtins */
async function loadGoogleFont(family: string, weight: number, text: string) {
	const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(
		text,
	)}`;
	const css = await (await fetch(url)).text();
	const resource = /src: url\((.+)\) format\('(?:opentype|truetype)'\)/.exec(
		css,
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error(`Failed to load font data for ${family} ${weight}.`);
}
/* eslint-enable n/no-unsupported-features/node-builtins */

const title = "tidelift-me-up";

export default async function OpenGraphImage() {
	const [ralewayBlack, ralewayRegular] = await Promise.all([
		loadGoogleFont("Raleway", 900, title),
		loadGoogleFont("Raleway", 400, metadata.description),
	]);

	return new ImageResponse(
		(
			<div
				style={{
					alignItems: "center",
					background: `linear-gradient(to bottom, ${colors.subtleTop} 0%, ${colors.background} 20%, ${colors.background} 80%, ${colors.subtleBottom} 100%)`,
					color: colors.foreground,
					display: "flex",
					flexDirection: "column",
					fontFamily: "Raleway",
					height: "100%",
					justifyContent: "center",
					padding: "4rem",
					width: "100%",
				}}
			>
				<h1
					style={{
						backgroundClip: "text",
						backgroundImage: `linear-gradient(to bottom, ${colors.boldTop}, ${colors.boldBottom} 50%)`,
						color: "transparent",
						fontSize: "8rem",
						fontWeight: 900,
						lineHeight: 1,
						margin: 0,
						textAlign: "center",
					}}
				>
					{title}
				</h1>
				<p
					style={{
						fontSize: "3rem",
						margin: "2rem 0 0",
						textAlign: "center",
					}}
				>
					{metadata.description}
				</p>
			</div>
		),
		{
			...size,
			fonts: [
				{ data: ralewayBlack, name: "Raleway", weight: 900 },
				{ data: ralewayRegular, name: "Raleway", weight: 400 },
			],
		},
	);
}
