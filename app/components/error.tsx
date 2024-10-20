"use client";

export default function Error({ text }: { text: string }) {
  return (
    <div className="bg-red-500 text-white p-8 rounded-md shadow-lg text-center">
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="text-l mt-4">{text}</p>
    </div>
  );
}
