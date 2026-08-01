import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type Teacher = {
  id: string
  name: string
  subject: string
  class: string
  email: string
  gender: string
  phone: string
  designation: string
  age?: string
  about?: string
  avatar?: string
}

type TeachersContextType = {
  teachers: Teacher[]
  addTeacher: (teacher: Omit<Teacher, "id">) => void
  getTeacher: (id: string) => Teacher | undefined
}

const TeachersContext = createContext<TeachersContextType | undefined>(undefined)

export function TeachersProvider({ children }: { children: ReactNode }) {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  function addTeacher(teacher: Omit<Teacher, "id">) {
    const newTeacher: Teacher = {
      ...teacher,
      id: crypto.randomUUID(),
    }
    setTeachers((prev) => [...prev, newTeacher])
  }

  function getTeacher(id: string) {
    return teachers.find((teacher) => teacher.id === id)
  }

  return (
    <TeachersContext.Provider value={{ teachers, addTeacher, getTeacher }}>
      {children}
    </TeachersContext.Provider>
  )
}

export function useTeachers() {
  const context = useContext(TeachersContext)
  if (!context) {
    throw new Error("useTeachers precisa ser usado dentro de um TeachersProvider")
  }
  return context
}