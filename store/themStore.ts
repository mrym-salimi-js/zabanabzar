import Cookies from "js-cookie";
import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme | null;
  toggle: () => void;
}

const cookieTheme = Cookies.get("theme");
// Use cookie because of it solved jumping after refresh page --> see RootLayout, ssr component that get cookies by async and fix jumping theme
export const useThemeStore = create<ThemeState>()((set, get) => ({
  theme: cookieTheme,
  toggle: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    set({ theme: newTheme });
    Cookies.set("theme", newTheme, { sameSite: "lax" });
  },
}));
