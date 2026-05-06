
export default function Footer() {
  return (
  <footer className="bg-gray-900 text-gray-300 mt-10">
    
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

      {/* Logo / Title */}
      <h2 className="text-xl font-bold text-white tracking-wide hover:text-yellow-400 transition">
        E-Commerce
      </h2>

      {/* Links */}
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-white transition">About</a>
        <a href="#" className="hover:text-white transition">Contact</a>
        <a href="#" className="hover:text-white transition">Privacy</a>
      </div>

      {/* Social */}
      <div className="flex gap-4 text-lg">
        <span className="hover:scale-110 transition cursor-pointer">🐦</span>
        <span className="hover:scale-110 transition cursor-pointer">📘</span>
        <span className="hover:scale-110 transition cursor-pointer">📸</span>
      </div>
    </div>

    {/* Bottom */}
    <div className="text-center text-xs border-t border-gray-700 py-4">
      © {new Date().getFullYear()} All rights reserved.
    </div>

  </footer>
)
}
