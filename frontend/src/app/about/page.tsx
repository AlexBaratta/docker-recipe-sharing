"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] px-6 sm:px-10 py-16">
      <div className="max-w-3xl mx-auto text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          About Recipe Sharing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Welcome to Recipe Sharing, the ultimate platform to share, discover,
          and enjoy delicious recipes from all around the world.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Food is a a huge part of our everyday life, and we believe we can
          bring everyone together through it. Every recipe is able to tell a
          story, and we love sharing these stories with the world :)
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          This is not just a simple recipe repository, this is a way for chefs,
          food lovers, and anyone interested in learning how to cook, to be able
          to share and search for new recipes!
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Thank you for being a part of our community. Happy cooking and
          sharing!
        </p>
      </div>
    </div>
  );
}
