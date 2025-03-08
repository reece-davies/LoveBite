export default function Navbar() {
  return (
    <nav className="bg-purple-600 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-semibold">
          <a href="/">LoveBites</a>
        </div>
        <ul className="flex space-x-8">
          <li>
            <a href="/" className="transition-all">Shopping List</a>
          </li>
          <li>
            <a href="/recipes" className="hover:font-bold transition-all">Recipes</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
