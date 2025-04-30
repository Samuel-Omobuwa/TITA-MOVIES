import NavbarInput from "./NavbarInput";
import Logo from "./Logo";
import NavbarMovieLength from "./NavbarMovieLength";

function NavBar({ children }) {
  return (
    <>
      <Logo />
      <NavbarInput />
      <NavbarMovieLength />
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

export default NavBar;
