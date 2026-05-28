import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logotipo / Nome */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
              REPELETR
            </Link>
          </div>
          
          {/* Links de Navegação */}
          <div className="flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Início
            </Link>
            <Link href="/formulario" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Enviar Fatura
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}