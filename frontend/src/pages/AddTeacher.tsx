import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Bell, Plus, Upload, FileText, Camera } from "lucide-react"
import { useTeachers } from "../providers/TeachersContext"
import Sidebar from "../components/Sidebar"
import { parseCsv } from "../utils/csv"

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
  margin: 0 0 1.5rem;
`

const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 2rem;
`

const Tab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#0f172a" : "#94a3b8")};
  border-bottom: 2px solid ${({ $active }) => ($active ? "#4f5fea" : "transparent")};
  cursor: pointer;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
  max-width: 760px;
`

const PhotoUploadWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
`

const PhotoLabel = styled.label`
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;

  input {
    display: none;
  }
`

const PhotoPreview = styled.div<{ $hasImage: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: #eef1f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  border: 1px dashed ${({ $hasImage }) => ($hasImage ? "transparent" : "#cbd5e1")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const PhotoBadge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #4f5fea;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
`

const PhotoHint = styled.div`
  font-size: 0.85rem;
  color: #64748b;

  strong {
    display: block;
    color: #0f172a;
    font-size: 0.9rem;
    margin-bottom: 0.15rem;
  }
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

const Select = styled.select`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  color: #334155;
  outline: none;
  background: #fff;

  &:focus {
    border-color: #4f5fea;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
`

const AddAnotherButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #334155;
  font-size: 0.9rem;
  cursor: pointer;
`

const SubmitButton = styled.button`
  background: #e2e8f0;
  color: #0f172a;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #d6dce6;
  }
`

const CsvArea = styled.div`
  max-width: 640px;
`

const DropZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 3rem 1.5rem;
  cursor: pointer;
  color: #64748b;
  text-align: center;

  &:hover {
    border-color: #4f5fea;
    color: #4f5fea;
  }

  input {
    display: none;
  }
`

const DropZoneTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #0f172a;
`

const DropZoneHint = styled.span`
  font-size: 0.8rem;
  color: #94a3b8;
`

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #f4f7fb;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #334155;
`

const PreviewList = styled.ul`
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`

const PreviewItem = styled.li`
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`

const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 0.75rem;
`

const ImportButton = styled.button`
  background: #4f5fea;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.5rem;

  &:hover {
    background: #3f4dd4;
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`

function AddTeacher() {
  const navigate = useNavigate()
  const { addTeacher } = useTeachers()
  const [tab, setTab] = useState<"manually" | "csv">("manually")

  const [form, setForm] = useState({
    designation: "",
    fullName: "",
    email: "",
    class: "",
    gender: "",
    password: "",
    phone: "",
    subject: "",
    photo: "",
  })

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = () => {
      updateField("photo", String(reader.result ?? ""))
    }
    reader.readAsDataURL(file)
  }

  const [csvFileName, setCsvFileName] = useState<string | null>(null)
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([])
  const [csvError, setCsvError] = useState<string | null>(null)

  function handleCsvChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setCsvFileName(file.name)
    setCsvError(null)

    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result ?? "")
      const rows = parseCsv(text)

      if (rows.length === 0) {
        setCsvError(
          "Não foi possível ler nenhuma linha. Confira se o arquivo tem cabeçalho e pelo menos uma linha de dados."
        )
        setCsvRows([])
        return
      }

      const missingName = rows.some((row) => !row["Full Name"] && !row["Nome"])
      if (missingName) {
        setCsvError(
          'O CSV precisa ter uma coluna "Full Name" (ou "Nome") preenchida em todas as linhas.'
        )
        setCsvRows([])
        return
      }

      setCsvRows(rows)
    }
    reader.onerror = () => {
      setCsvError("Erro ao ler o arquivo. Tenta novamente.")
    }
    reader.readAsText(file)
  }

  function handleImportCsv() {
    csvRows.forEach((row) => {
      addTeacher({
        name: row["Full Name"] || row["Nome"] || "",
        email: row["Email address"] || row["Email"] || "",
        subject: row["Subject"] || row["Materia"] || "",
        class: row["Class"] || row["Turma"] || "",
        gender: row["Gender"] || row["Genero"] || "",
        phone: row["Phone number"] || row["Telefone"] || "",
        designation: row["Designation"] || row["Cargo"] || "",
      })
    })

    navigate("/teachers")
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!form.fullName || !form.email) return

    addTeacher({
      name: form.fullName,
      email: form.email,
      subject: form.subject,
      class: form.class,
      gender: form.gender,
      phone: form.phone,
      designation: form.designation,
      avatar: form.photo || undefined,
    })

    navigate("/teachers")
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

      <Title>Add Teachers</Title>

      <Tabs>
        <Tab $active={tab === "manually"} onClick={() => setTab("manually")}>
          Manually
        </Tab>
        <Tab $active={tab === "csv"} onClick={() => setTab("csv")}>
          Import CSV
        </Tab>
      </Tabs>

      {tab === "manually" ? (
        <form onSubmit={handleSubmit}>
          <PhotoUploadWrap>
            <PhotoLabel>
              <PhotoPreview $hasImage={!!form.photo}>
                {form.photo ? (
                  <img src={form.photo} alt="Foto do professor" />
                ) : (
                  <Camera size={22} />
                )}
              </PhotoPreview>
              <PhotoBadge>
                <Upload size={13} />
              </PhotoBadge>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </PhotoLabel>
            <PhotoHint>
              <strong>Foto do professor</strong>
              Clique no círculo para escolher uma imagem (opcional)
            </PhotoHint>
          </PhotoUploadWrap>

          <Grid>
            <Field>
              <Label>Full Name</Label>
              <Input
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                required
              />
            </Field>
            <Field>
              <Label>Designation</Label>
              <Input
                value={form.designation}
                onChange={(e) => updateField("designation", e.target.value)}
              />
            </Field>

            <Field>
              <Label>Email address</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </Field>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Field style={{ flex: 1 }}>
                <Label>Class</Label>
                <Select
                  value={form.class}
                  onChange={(e) => updateField("class", e.target.value)}
                >
                  <option value="">Class</option>
                  <option value="JSS 1">JSS 1</option>
                  <option value="JSS 2">JSS 2</option>
                  <option value="JSS 3">JSS 3</option>
                  <option value="SS 3">SS 3</option>
                </Select>
              </Field>
              <Field style={{ flex: 1 }}>
                <Label>Gender</Label>
                <Select
                  value={form.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="">Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </Select>
              </Field>
            </div>

            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
              />
            </Field>
            <Field>
              <Label>Phone number</Label>
              <Input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </Field>

            <Field>
              <Label>Subject</Label>
              <Select
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
              >
                <option value="">Subject</option>
                <option value="Maths">Maths</option>
                <option value="English">English</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Geography">Geography</option>
              </Select>
            </Field>
          </Grid>

          <Actions>
            <AddAnotherButton type="button">
              <Plus size={18} />
              Add another
            </AddAnotherButton>
            <SubmitButton type="submit">Add Teacher</SubmitButton>
          </Actions>
        </form>
      ) : (
        <CsvArea>
          <DropZone>
            <Upload size={28} />
            <DropZoneTitle>Clique para escolher um arquivo CSV</DropZoneTitle>
            <DropZoneHint>
              Colunas esperadas: Full Name, Email address, Subject, Class, Gender, Phone
              number, Designation
            </DropZoneHint>
            <input type="file" accept=".csv" onChange={handleCsvChange} />
          </DropZone>

          {csvFileName && (
            <FileInfo>
              <FileText size={16} />
              {csvFileName} — {csvRows.length} linha(s) encontrada(s)
            </FileInfo>
          )}

          {csvError && <ErrorText>{csvError}</ErrorText>}

          {csvRows.length > 0 && (
            <PreviewList>
              {csvRows.slice(0, 5).map((row, index) => (
                <PreviewItem key={index}>
                  {row["Full Name"] || row["Nome"]} —{" "}
                  {row["Email address"] || row["Email"]}
                </PreviewItem>
              ))}
              {csvRows.length > 5 && (
                <PreviewItem>...e mais {csvRows.length - 5} linha(s)</PreviewItem>
              )}
            </PreviewList>
          )}

          <ImportButton
            type="button"
            disabled={csvRows.length === 0}
            onClick={handleImportCsv}
          >
            Importar {csvRows.length > 0 ? `${csvRows.length} professor(es)` : ""}
          </ImportButton>
        </CsvArea>
      )}
      </Page>
    </Container>
  )
}

export default AddTeacher