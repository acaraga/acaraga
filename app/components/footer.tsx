export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-4 text-center">
      <p>&copy; {year} Acaraga Indonesia. All rights reserved.</p>
    </footer>
  );
}
