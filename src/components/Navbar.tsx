import Logo from "./Navbar/Logo";

export default function Navbar() {
  return (
    <div className="w-full fixed z-50 inset-x-0 bg-inherit border-b border-b-encore/20">
      <div className="w-full lg:max-w-screen-2xl mx-auto p-4 flex items-center justify-between">
        <Logo />
      </div>
    </div>
  );
}
