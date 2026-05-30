import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <Link href="/" className="logo">
          Repeletr
        </Link>

        {/* LINKS */}

        <div className="nav-links">

          <Link href="/">
            Início
          </Link>

          <Link href="/formulario">
            Simulação Gratuita
          </Link>

        </div>

      </div>

    </nav>
  );
}