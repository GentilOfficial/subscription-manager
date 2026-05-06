import Markdown from 'react-markdown';

export default function MarkedText({ text }) {
    return (
        <Markdown
            components={{
                p: ({ children }) => (
                    <p className="text-justify">{children}</p>
                ),
                a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                        className="underline text-primary hover:text-primary/80 transition-colors">
                        {children}
                    </a>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc pl-5 my-4">
                        {children}
                    </ul>
                ),
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary italic my-4 p-4 text-app-muted bg-app-bg dark:bg-app-bg-dark rounded-e-lg">
                        {children}
                    </blockquote>
                )
            }}
        >
            {text}
        </Markdown>
    )
}