"use client";

export default function Error({
  text,
  errorCode,
}: {
  text: string;
  errorCode?: string;
}) {
  return (
    <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold">{errorCode ?? "Error"}</h1>
      <p className="text-l mt-4">{text}</p>
    </div>
  );
}
