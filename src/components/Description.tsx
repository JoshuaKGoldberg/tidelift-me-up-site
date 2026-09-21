import Markdown from "react-markdown";

import { Anchor } from "./Anchor";

export interface DescriptionProps {
	children: string;
}

const allowedElements = ["a", "code", "em", "strong"];

export function Description({ children }: DescriptionProps) {
	return (
		<Markdown
			allowedElements={allowedElements}
			components={{
				a: ({ children, href }) => (
					<Anchor href={href} rel="noreferrer" target="_blank">
						{children}
					</Anchor>
				),
			}}
			unwrapDisallowed
		>
			{children}
		</Markdown>
	);
}
