interface FallbackContentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function FallbackContent({ title, description, children }: FallbackContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded-full" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
}
