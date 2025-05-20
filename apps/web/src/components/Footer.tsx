import { SocialButtons } from "./SocialButtons";

export function Footer() {
  return (
    <footer className="w-full flex justify-center mt-8 mb-4">
      <div className="transition-opacity duration-300">
        <SocialButtons />
      </div>
    </footer>
  );
}