import Image from "next/image";

export default function Home() {
  return (
    // Removed styling: min-h-screen pb-18
    // border-4 border-red-500
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="border-4 border-red-500 flex flex-col p-8 gap-8 row-start-2 items-center sm:items-start min-w-[300px] max-w-[500px]">
        <h1>Shopping List</h1>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
            <span className="text-gray-800">Chicken fajitas aaaaaaaaa aaaaaaaaa aaaaaaaaa aaaaaaa </span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
            <span className="text-gray-800">Pesto pasta</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
            <span className="text-gray-800">Fried rice</span>
          </label>
        </div>
      </main>
    </div>
  );
}
