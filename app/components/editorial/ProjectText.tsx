// Preserve the language's spelling when prose wraps at narrow widths.
export default function ProjectText({ text }: { text: string }) {
  return <>{text.split(/(J--)/).map((part, index) => part === 'J--'
    ? <span className="language-name" translate="no" key={index}>{part}</span>
    : part)}</>;
}
