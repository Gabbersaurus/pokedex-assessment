export default function ExternalLink({
  path,
  text,
}: {
  path: string;
  text: string;
}) {
  return (
    <a href={path} target="_blank" className="text-blue-600 hover:underline">
      {text}
    </a>
  );
}
