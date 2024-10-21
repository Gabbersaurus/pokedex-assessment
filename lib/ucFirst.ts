export default function ucFirst(input: string) {
  if (input.length < 0) return "";
  if (input.length < 1) return input.toUpperCase();
  return input.charAt(0).toUpperCase() + input.slice(1);
}
