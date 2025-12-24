"use client";

import { createContext, useContext, useState, useEffect } from "react";

type SemesterContextType = {
  semester: string;
  setSemester: (semester: string) => void;
};

const SemesterContext = createContext<SemesterContextType | undefined>(undefined);

export const SEMESTERS = [
  { value: "FY-Sem-1", label: "FY Sem 1" },
  { value: "FY-Sem-2", label: "FY Sem 2" },
  { value: "SY-Sem-1", label: "SY Sem 1" },
  { value: "SY-Sem-2", label: "SY Sem 2" },
  { value: "TY-Sem-1", label: "TY Sem 1" },
  { value: "TY-Sem-2", label: "TY Sem 2" },
  { value: "BTech-Sem-1", label: "B.Tech Sem 1" },
  { value: "BTech-Sem-2", label: "B.Tech Sem 2" },
];

export function SemesterProvider({ children }: { children: React.ReactNode }) {
  const [semester, setSemesterState] = useState<string>("FY-Sem-1");

  useEffect(() => {
    // Load semester from localStorage on mount
    const savedSemester = localStorage.getItem("selectedSemester");
    if (savedSemester) {
      setSemesterState(savedSemester);
    }
  }, []);

  const setSemester = (newSemester: string) => {
    setSemesterState(newSemester);
    localStorage.setItem("selectedSemester", newSemester);
  };

  return (
    <SemesterContext.Provider value={{ semester, setSemester }}>
      {children}
    </SemesterContext.Provider>
  );
}

export function useSemester() {
  const context = useContext(SemesterContext);
  if (context === undefined) {
    throw new Error("useSemester must be used within a SemesterProvider");
  }
  return context;
}
