import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Bell, Search, ChevronDown, Headphones, ChevronUp, GraduationCap, Phone, Mail } from "lucide-react"
import { useStudents } from "../providers/StudentsContext"
import Sidebar from "../components/Sidebar"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`

const Page = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f4f7fb;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const BellButton = styled.button`
  position: relative;
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

const Dot = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4f5fea;
`

const LogoutLink = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0f172a;
  cursor: pointer;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`

const ExportButton = styled.button`
  background: none;
  border: none;
  color: #4f5fea;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
`

const AddButton = styled.button`
  background: #4f5fea;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #3f4dd4;
  }
`

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: #eef1f6;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  color: #94a3b8;
  cursor: pointer;
`

const SearchWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #eef1f6;
  border-radius: 8px;
  padding: 0.65rem 1rem;

  svg {
    color: #94a3b8;
    flex-shrink: 0;
  }
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: #0f172a;

  &::placeholder {
    color: #94a3b8;
  }
`

const Body = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`

const Panel = styled.div`
  flex: 1;
  background: #f9fafc;
  border-radius: 12px;
  min-height: 380px;
  position: relative;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  text-align: center;
  gap: 0.5rem;
`

const EmptyIcon = styled.div`
  color: #cbd5e1;
  margin-bottom: 0.5rem;
`

const EmptyTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`

const EmptyDescription = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  padding: 1rem 1.25rem;
`

const Tr = styled.tr<{ $active: boolean }>`
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#4f5fea" : "transparent")};

  td {
    color: ${({ $active }) => ($active ? "#fff" : "#334155")};
  }

  &:nth-child(even) {
    background: ${({ $active }) => ($active ? "#4f5fea" : "#eef1f6")};
  }

  &:hover {
    background: ${({ $active }) => ($active ? "#4f5fea" : "#e4e8f5")};
  }
`

const Td = styled.td`
  padding: 0.85rem 1.25rem;
  font-size: 0.875rem;
`

const NameCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`

const DetailCard = styled.div`
  width: 280px;
  flex-shrink: 0;
  background: #f9fafc;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
`

const DetailId = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 1rem;
`

const DetailPhoto = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.75rem;
`

const DetailName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`

const DetailRole = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: 0.15rem 0 1rem;
`

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #eef1f6;
  color: #4f5fea;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const AboutTitle = styled.h4`
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  text-align: left;
  margin: 0 0 0.5rem;
`

const AboutText = styled.p`
  font-size: 0.8rem;
  color: #94a3b8;
  text-align: left;
  line-height: 1.6;
  margin: 0 0 1.25rem;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 1.25rem;
`

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const InfoLabel = styled.span`
  font-size: 0.8rem;
  color: #334155;
`

const InfoValue = styled.span`
  font-size: 0.85rem;
  color: #94a3b8;
`

const SupportButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1b1f3b;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(27, 31, 59, 0.25);

  &:hover {
    background: #252a4d;
  }
`

function Students() {
  const navigate = useNavigate()
  const { students } = useStudents()
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email}`.toLowerCase().includes(search.toLowerCase())
  )

  const selectedStudent = students.find((student) => student.id === selectedId)

  function handleExportCsv() {
    const header = "Name,Student ID,Email,Class,Gender\n"
    const rows = students
      .map((s) => `${s.name},${s.studentId},${s.email},${s.class},${s.gender}`)
      .join("\n")
    const blob = new Blob([header + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "students.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Container>
      <Sidebar />
      <Page>
        <TopBar>
          <BellButton aria-label="Notifications">
            <Bell size={18} />
            <Dot />
          </BellButton>
          <LogoutLink onClick={() => navigate("/login")}>Log out</LogoutLink>
        </TopBar>

        <HeaderRow>
          <Title>Students</Title>
          <HeaderActions>
            <ExportButton onClick={handleExportCsv}>Export CSV</ExportButton>
            <AddButton onClick={() => navigate("/students/add")}>
              Add Student
            </AddButton>
          </HeaderActions>
        </HeaderRow>

        <FilterRow>
          <FilterButton>
            Add filter
            <ChevronDown size={16} />
          </FilterButton>
          <SearchWrap>
            <Search size={16} />
            <SearchInput
              placeholder="Search for a student by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrap>
        </FilterRow>

        <Body>
          <Panel>
            {students.length === 0 ? (
              <EmptyState>
                <EmptyIcon>
                  <GraduationCap size={56} strokeWidth={1.25} />
                </EmptyIcon>
                <EmptyTitle>No students at this time</EmptyTitle>
                <EmptyDescription>
                  Students will appear here after they enroll in your school.
                </EmptyDescription>
              </EmptyState>
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Student ID</Th>
                    <Th>Email address</Th>
                    <Th>Class</Th>
                    <Th>Gender</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <Tr
                      key={student.id}
                      $active={student.id === selectedId}
                      onClick={() => setSelectedId(student.id)}
                    >
                      <Td>
                        <NameCell>
                          <Avatar
                            src={
                              student.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}`
                            }
                            alt={student.name}
                          />
                          {student.name}
                        </NameCell>
                      </Td>
                      <Td>{student.studentId}</Td>
                      <Td>{student.email}</Td>
                      <Td>{student.class}</Td>
                      <Td>{student.gender}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Panel>

          {selectedStudent && (
            <DetailCard>
              <DetailId>{selectedStudent.studentId}</DetailId>
              <DetailPhoto
                src={
                  selectedStudent.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedStudent.name)}&size=96`
                }
                alt={selectedStudent.name}
              />
              <DetailName>{selectedStudent.name}</DetailName>
              <DetailRole>{selectedStudent.class || "Student"}</DetailRole>

              <IconRow>
                <IconButton aria-label="Class">
                  <GraduationCap size={15} />
                </IconButton>
                <IconButton aria-label="Phone">
                  <Phone size={15} />
                </IconButton>
                <IconButton aria-label="Email">
                  <Mail size={15} />
                </IconButton>
              </IconRow>

              <AboutTitle>About</AboutTitle>
              <AboutText>
                {selectedStudent.about ||
                  `${selectedStudent.name} está matriculado(a) na turma ${selectedStudent.class || "-"}.`}
              </AboutText>

              <InfoRow>
                <InfoField>
                  <InfoLabel>Age</InfoLabel>
                  <InfoValue>{selectedStudent.age || "-"}</InfoValue>
                </InfoField>
                <InfoField>
                  <InfoLabel>Gender</InfoLabel>
                  <InfoValue>{selectedStudent.gender || "-"}</InfoValue>
                </InfoField>
              </InfoRow>
            </DetailCard>
          )}
        </Body>

        <SupportButton onClick={() => navigate("/support")}>
          <Headphones size={16} />
          Support
          <ChevronUp size={16} />
        </SupportButton>
      </Page>
    </Container>
  )
}

export default Students