// File: src/components/PageHeader.tsx
// Purpose: Creates a dark banner header that appears at the top of assessment pages
// The header features centered white text against a black background

export default function PageHeader() {
    return (
      // The outer container creates a full-width black background
      <div className="w-full bg-black py-4">
        {/* The inner container helps center the content and maintain consistent width */}
        <div className="max-w-4xl mx-auto px-4">
          {/* The heading uses white text and is centered */}
          <h1 className="text-3xl font-semibold text-white text-center">
            Product Designer Assessment
          </h1>
        </div>
      </div>
    );
  }