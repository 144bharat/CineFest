import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center px-8 py-6 sm:px-12 bg-linear-to-b from-black">
      <img src={logo} alt="Cine Fest logo" className="w-20 sm:w-24" />
      <h1 className="ml-2 text-3xl font-disney text-primary sm:text-4xl">
        Cine Fest
      </h1>
    </header>
  );
};
export default Header;
