import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] flex flex-col items-center justify-center px-6 sm:px-20 py-20 gap-16 text-center">
      <main className="flex flex-col items-center gap-6">
        <Image
          src="/logo.png"
          alt="Recipe Share logo"
          width={100}
          height={100}
          className="dark:invert"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white">
          Welcome to Recipe Sharing
        </h1>

        <p className="text-lg sm:text-xl max-w-xl text-gray-600 dark:text-gray-300">
          Discover and share your favorite recipes with food lovers around the
          world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="/recipes"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm sm:text-base transition shadow"
          >
            Browse Recipes
          </a>
          <a
            href="/submit"
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-full text-sm sm:text-base transition"
          >
            Share Your Recipe
          </a>
          <a
            href="/about"
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-full text-sm sm:text-base transition"
          >
            About
          </a>
        </div>
      </main>
    </div>
  );
}
