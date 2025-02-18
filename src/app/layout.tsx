import { Raleway } from "next/font/google";

import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
	description:
		"Check if your npm packages are eligible for Tidelift funding. 💸",
	title: "Tidelift Me Up",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body className={raleway.className}>{children}</body>
		</html>
	);
}
