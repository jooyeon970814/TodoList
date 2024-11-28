import React, { createContext, useContext, useState, ReactNode } from "react";

// Theme context 정의
const ThemeContext = createContext<
  | {
      isTheme: boolean;
      setTheme: React.Dispatch<React.SetStateAction<boolean>>; // 상태 업데이트 함수
      toggle: () => void; // 토글 함수
    }
  | undefined
>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider → ThemeCtx로 변경
export const SetTheme = ({ children }: ThemeProviderProps) => {
  const [isTheme, setTheme] = useState(false); // isTheme 상태

  // toggleTheme → toggle로 변경
  const toggle = () => setTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isTheme, setTheme, toggle }}>
      {children} {/* 자식 컴포넌트에 테마 상태와 함수를 전달 */}
    </ThemeContext.Provider>
  );
};

// useThemeContext → useTheme로 변경
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeCtx");
  }
  return context;
};
