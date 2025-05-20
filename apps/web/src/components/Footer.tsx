import { IconTwitterX } from "./Icons";

export function Footer() {
  return (
    <footer className="w-full flex justify-center mt-8 mb-4">
      <div className="text-white opacity-60 hover:opacity-100 transition-opacity duration-300 transform scale-150">
        <IconTwitterX size={96} />
      </div>
    </footer>
  );
}
