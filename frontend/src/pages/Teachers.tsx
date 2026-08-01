import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Bell, Search, ChevronDown, Headphones, ChevronUp } from "lucide-react"
import { useTeachers } from "../providers/TeachersContext"
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

const Panel = styled.div`
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
`

const EmptyTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem;
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

const Tr = styled.tr`
  cursor: pointer;

  &:nth-child(even) {
    background: #eef1f6;
  }

  &:hover {
    background: #e4e8f5;
  }
`

const Td = styled.td`
  padding: 0.85rem 1.25rem;
  font-size: 0.875rem;
  color: #334155;
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

function Teachers() {
  const navigate = useNavigate()
  const { teachers } = useTeachers()
  const [search, setSearch] = useState("")

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.name} ${teacher.email}`.toLowerCase().includes(search.toLowerCase())
  )

  function handleExportCsv() {
    const header = "Name,Subject,Class,Email,Gender\n"
    const rows = teachers
      .map((t) => `${t.name},${t.subject},${t.class},${t.email},${t.gender}`)
      .join("\n")
    const blob = new Blob([header + rows], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "teachers.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Container>
      <Sidebar />
      <Page>
      <TopBar>
        <BellButton aria-label="Notifications" onClick={() => navigate("/notifications")}>
          <Bell size={18} />
          <Dot />
        </BellButton>
        <LogoutLink onClick={() => navigate("/login")}>Log out</LogoutLink>
      </TopBar>

      <HeaderRow>
        <Title>Teachers</Title>
        <HeaderActions>
          <ExportButton onClick={handleExportCsv}>Export CSV</ExportButton>
          <AddButton onClick={() => navigate("/teachers/add")}>
            Add Teachers
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
            placeholder="Search for a teachers by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrap>
      </FilterRow>

      <Panel>
        {teachers.length === 0 ? (
          <EmptyState>
            <EmptyTitle>No Teachers at this time</EmptyTitle>
            <EmptyDescription>
              Teachers will appear here after they enroll in your school.
            </EmptyDescription>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Subject</Th>
                <Th>Class</Th>
                <Th>Email address</Th>
                <Th>Gender</Th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <Tr
                  key={teacher.id}
                  onClick={() => navigate(`/teachers/${teacher.id}`)}
                >
                  <Td>
                    <NameCell>
                      <Avatar
                        src={
                          teacher.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}`
                        }
                        alt={teacher.name}
                      />
                      {teacher.name}
                    </NameCell>
                  </Td>
                  <Td>{teacher.subject}</Td>
                  <Td>{teacher.class}</Td>
                  <Td>{teacher.email}</Td>
                  <Td>{teacher.gender}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>

      <SupportButton onClick={() => navigate("/support")}>
        <Headphones size={16} />
        Support
        <ChevronUp size={16} />
      </SupportButton>
      </Page>
    </Container>
  )
}

export default Teachers