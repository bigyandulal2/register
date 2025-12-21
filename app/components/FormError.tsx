 "use client";

interface FormErrorProps {
  message?: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
      {message}
    </div>
  );
}
