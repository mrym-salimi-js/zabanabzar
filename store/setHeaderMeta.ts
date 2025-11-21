import { create } from "zustand";

type HeaderMataStore = {
  meta: object;
  setMeta: (data: { title: string; desc: string }) => void;
};

export const useHeaderMeta = create<HeaderMataStore>((set) => ({
  meta: Object,
  setMeta: (data: { title: string; desc: string }) =>
    set({
      meta: data,
    }),
}));
