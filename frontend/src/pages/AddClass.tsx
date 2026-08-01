import { useState } from "react"
import type { FormEvent } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Bell } from "lucide-react"
import { useClasses } from "../providers/ClassesContext"
import Sidebar from "../components/Sidebar"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`

const Page = styled.div`
  flex: 1;
  padding: 2rem;
  background: #ffffff;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const BellButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #334155;
  cursor: pointer;

  &:hover {
    background: #eef1f6;
  }
`

const LogoutLink = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0f172a;
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 2rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
  max-width: 640px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Label = styled.label`
  font-size: 0.85rem;
  color: #334155;
`

const Input = styled.input`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: #4f5fea;
  }
`

const TextArea = styled.textarea`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  min-height: 90px;
  grid-column: span 2;

  &:focus {
    border-color: #4f5fea;
  }
`

const SubmitButton = styled.button`
  background: #4f5fea;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background: #3f4dd4;
  }
`

function AddClass() {
  const navigate = useNavigate()
  const { addClass } = useClasses()

  const [form, setForm] = useState({
    name: "",
    teacher: "",
    capacity: "",
    description: "",
  })

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name) return

    addClass({
      name: form.name,
      teacher: form.teacher,
      capacity: form.capacity,
      description: form.description,
    })

    navigate("/classes")
  }

  return (
    <Container>
      <Sidebar />
      <Page>
        <TopBar>
          <BellButton aria-label="Notifications">
            <Bell size={18} />
          </BellButton>
          <LogoutLink onClick={() => navigate("/login")}>Log out</LogoutLink>
        </TopBar>

        <Title>Add Sala</Title>

        <form onSubmit={handleSubmit}>
          <Grid>
            <Field>
              <Label>Nome da sala</Label>
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Ex: JSS 3"
                required
              />
            </Field>
            <Field>
              <Label>Capacidade</Label>
              <Input
                value={form.capacity}
                onChange={(e) => updateField("capacity", e.target.value)}
                placeholder="Ex: 30 alunos"
              />
            </Field>

            <Field>
              <Label>Professor responsável</Label>
              <Input
                value={form.teacher}
                onChange={(e) => updateField("teacher", e.target.value)}
                placeholder="Opcional"
              />
            </Field>

            <Field style={{ gridColumn: "span 2" }}>
              <Label>Descrição</Label>
              <TextArea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Opcional"
              />
            </Field>
          </Grid>

          <SubmitButton type="submit">Add sala</SubmitButton>
        </form>
      </Page>
    </Container>
  )
}

export default AddClass