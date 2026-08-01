import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type Student = {
  id: string
  studentId: string
  name: string
  email: string
  class: string
  gender: string
  phone: string
  age?: string
  about?: string
  avatar?: string
}

type StudentsContextType = {
  students: Student[]
  addStudent: (student: Omit<Student, "id" | "studentId">) => void
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

function generateStudentId() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([])

  function addStudent(student: Omit<Student, "id" | "studentId">) {
    const newStudent: Student = {
      ...student,
      id: crypto.randomUUID(),
      studentId: generateStudentId(),
    }
    setStudents((prev) => [...prev, newStudent])
  }

  return (
    <StudentsContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentsContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentsContext)
  if (!context) {
    throw new Error("useStudents precisa ser usado dentro de um StudentsProvider")
  }
  return context
}