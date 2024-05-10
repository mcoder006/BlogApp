
const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex items-center justify-center w-full p-8 text-center footer bg-neutral text-neutral-content bg-slate-800 text-slate-300">
      <div className="container flex items-center justify-between mx-auto">
        <div>
          &copy; copyright <span className="font-bold uppercase">Sk Tech</span>
        </div>
        <nav>
          <ul className="flex">
            <li className="mr-4">
              <a className="cursor-pointer hover:text-gray-300">
                Home
              </a>
            </li>
            <li className="mr-4">
              <a className="cursor-pointer hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a className="cursor-pointer hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer