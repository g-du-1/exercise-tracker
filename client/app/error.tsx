"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return <div>An error occurred: {error.message}</div>;
}
