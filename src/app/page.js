'use client';

import Forms from './dashboard/forms';

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] gap-8">
      
      {/* Header */}
      <header className="text-3xl text-center font-semibold">
        Iremia Medical Hospital
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-12 w-full">
        
        {/* Section 1 - Centered */}
        <section className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-1 gap-8">
          <Forms />
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-gray-500">
        Developed by Ady
      </footer>
    </div>
  );
}
