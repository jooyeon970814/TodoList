import { create } from "zustand";
// 테마 상태를 관리하는 store 정의
interface ThemeStore {
  isTheme: boolean;
  setTheme: (theme: boolean) => void;
  toggle: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  isTheme: false, // 초기 테마 상태
  setTheme: (theme: boolean) => set({ isTheme: theme }), // 상태 업데이트 함수
  toggle: () => set((state: ThemeStore) => ({ isTheme: !state.isTheme })), // 토글 함수
}));

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const SetTheme = ({ children }: ThemeProviderProps) => {
  return <>{children}</>;
};

export const useTheme = () => {
  const { isTheme, setTheme, toggle } = useThemeStore();
  return { isTheme, setTheme, toggle };
};
