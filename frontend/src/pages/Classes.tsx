import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { Bell, Search, Headphones, ChevronUp, Landmark, Users } from "lucide-react"
import { useClasses } from "../providers/ClassesContext"
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

const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #eef1f6;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  max-width: 420px;
  margin-bottom: 1.5rem;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
`

const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
`

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #eef0fd;
  color: #4f5fea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
`

const CardName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.25rem;
`

const CardMeta = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
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

function Classes() {
  const navigate = useNavigate()
  const { classes } = useClasses()
  const [search, setSearch] = useState("")

  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

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
          <Title>Salas</Title>
          <AddButton onClick={() => navigate("/classes/add")}>
            Add Sala
          </AddButton>
        </HeaderRow>

        <SearchWrap>
          <Search size={16} />
          <SearchInput
            placeholder="Search for a sala by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrap>

        <Panel>
          {classes.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <Landmark size={56} strokeWidth={1.25} />
              </EmptyIcon>
              <EmptyTitle>No salas at this time</EmptyTitle>
              <EmptyDescription>
                Crie sua primeira sala para organizar turmas e alunos.
              </EmptyDescription>
            </EmptyState>
          ) : (
            <Grid>
              {filteredClasses.map((classroom) => (
                <Card key={classroom.id}>
                  <CardIcon>
                    <Users size={18} />
                  </CardIcon>
                  <CardName>{classroom.name}</CardName>
                  <CardMeta>
                    {classroom.teacher ? `Professor: ${classroom.teacher}` : "Sem professor definido"}
                  </CardMeta>
                  {classroom.capacity && (
                    <CardMeta>Capacidade: {classroom.capacity}</CardMeta>
                  )}
                </Card>
              ))}
            </Grid>
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

export default Classes