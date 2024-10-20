interface NavLinkProps {
  path: string;
  text: string;
}

export default function ExternalLink({ path, text }: NavLinkProps) {
  return (
    <a href={path} target="_blank" className="text-blue-600 hover:underline">
      {text}
    </a>
  );
}
