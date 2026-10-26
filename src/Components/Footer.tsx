import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../ReusableComp/Container";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <Container>
        <div className="flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/products" className="text-xl font-bold tracking-tight text-slate-900">
              ahm<span className="text-emerald-700">3t</span> shop
            </Link>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              A modern demo storefront for discovering everyday favorites.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600" aria-label="Footer navigation">
            <Link to="/products" className="hover:text-emerald-800">Shop</Link>
            <Link to="/search" className="hover:text-emerald-800">Search</Link>
            <Link to="/cart" className="hover:text-emerald-800">Cart</Link>
          </nav>
          <div className="flex items-center gap-4 text-slate-500" aria-label="Social links">
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ahmed3ttiaa" aria-label="Instagram" className="hover:text-emerald-800">
              <FaInstagram size={20} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ahmed.attia.88284" aria-label="Facebook" className="hover:text-emerald-800">
              <FaFacebook size={20} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@ahmed3tiaa" aria-label="TikTok" className="hover:text-emerald-800">
              <FaTiktok size={20} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/201024365443" aria-label="WhatsApp" className="hover:text-emerald-800">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
        <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Ahmed Attia · Demo storefront
        </div>
      </Container>
    </footer>
  );
}
