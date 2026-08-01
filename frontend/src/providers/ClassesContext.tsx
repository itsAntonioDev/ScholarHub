import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type Classroom = {
  id: string
  name: string
  teacher?: string
  capacity?: string
  description?: string
}

type ClassesContextType = {
  classes: Classroom[]
  addClass: (classroom: Omit<Classroom, "id">) => void
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined)

export function ClassesProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<Classroom[]>([])

  function addClass(classroom: Omit<Classroom, "id">) {
    const newClass: Classroom = {
      ...classroom,
      id: crypto.randomUUID(),
    }
    setClasses((prev) => [...prev, newClass])
  }

  return (
    <ClassesContext.Provider value={{ classes, addClass }}>
      {children}
    </ClassesContext.Provider>
  )
}

export function useClasses() {
  const context = useContext(ClassesContext)
  if (!context) {
    throw new Error("useClasses precisa ser usado dentro de um ClassesProvider")
  }
  return context
}