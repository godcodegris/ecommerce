export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <strong>Mi Proyecto</strong> &copy; 2025
        </div>
        <div>
          <a href="/about" className="text-white me-3 text-decoration-none">About</a>
          <a href="/contact" className="text-white text-decoration-none">Contact</a>
        </div>
      </div>
    </footer>
  );
}
