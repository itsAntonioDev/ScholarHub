import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { Bell, GraduationCap, Phone, Mail } from "lucide-react"
import { useTeachers } from "../providers/TeachersContext"
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
  justify-content: space-between;
  margin-bottom: 2rem;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
`

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
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

const SearchBar = styled.div`
  background: #f4f7fb;
  border-radius: 8px;
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  color: #334155;
  margin-bottom: 3rem;
  max-width: 400px;
`

const Content = styled.div`
  display: flex;
  gap: 3rem;
`

const PhotoWrap = styled.div`
  flex-shrink: 0;
`

const Photo = styled.img`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  object-fit: cover;
`

const NameBlock = styled.div`
  text-align: center;
  margin-top: 1.25rem;
`

const Name = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`

const Role = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  margin: 0.25rem 0 1rem;
`

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
`

const IconButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: none;
  background: #eef1f6;
  color: #4f5fea;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Details = styled.div`
  flex: 1;
`

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 0.75rem;
`

const About = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 0 2rem;
`

const InfoRow = styled.div`
  display: flex;
  gap: 4rem;
  margin-bottom: 2rem;
`

const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const InfoLabel = styled.span`
  font-size: 0.85rem;
  color: #334155;
`

const InfoValue = styled.span`
  font-size: 0.9rem;
  color: #94a3b8;
`

const Colleagues = styled.div`
  display: flex;
  align-items: center;
  gap: -8px;
`

const ColleagueAvatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  margin-left: -8px;

  &:first-child {
    margin-left: 0;
  }
`

const MoreLink = styled.span`
  font-size: 0.85rem;
  color: #4f5fea;
  margin-left: 0.75rem;
  cursor: pointer;
`

function TeacherProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { getTeacher, teachers } = useTeachers()
  const teacher = getTeacher(id ?? "")

  if (!teacher) {
    return (
      <Container>
        <Sidebar />
        <Page>
          <p>Teacher não encontrado.</p>
        </Page>
      </Container>
    )
  }

  const colleagues = teachers.filter((t) => t.id !== teacher.id).slice(0, 5)

  return (
    <Container>
      <Sidebar />
      <Page>
      <TopBar>
        <HeaderActions>
          <ExportButton>Export CSV</ExportButton>
          <AddButton onClick={() => navigate("/teachers/add")}>
            Add Teachers
          </AddButton>
        </HeaderActions>
        <RightActions>
          <BellButton aria-label="Notifications">
            <Bell size={18} />
          </BellButton>
          <LogoutLink onClick={() => navigate("/login")}>Log out</LogoutLink>
        </RightActions>
      </TopBar>

      <SearchBar>{teacher.name}</SearchBar>

      <Content>
        <PhotoWrap>
          <Photo
            src={
              teacher.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=260`
            }
            alt={teacher.name}
          />
          <NameBlock>
            <Name>{teacher.name}</Name>
            <Role>{teacher.subject} teacher</Role>
            <IconRow>
              <IconButton aria-label="Subject">
                <GraduationCap size={16} />
              </IconButton>
              <IconButton aria-label="Phone">
                <Phone size={16} />
              </IconButton>
              <IconButton aria-label="Email">
                <Mail size={16} />
              </IconButton>
            </IconRow>
          </NameBlock>
        </PhotoWrap>

        <Details>
          <SectionTitle>About</SectionTitle>
          <About>
            {teacher.about ||
              `${teacher.name} leciona ${teacher.subject} na turma ${teacher.class || "-"}.`}
          </About>

          <InfoRow>
            <InfoField>
              <InfoLabel>Age</InfoLabel>
              <InfoValue>{teacher.age || "-"}</InfoValue>
            </InfoField>
            <InfoField>
              <InfoLabel>Gender</InfoLabel>
              <InfoValue>{teacher.gender || "-"}</InfoValue>
            </InfoField>
          </InfoRow>

          <SectionTitle>Teachers from the same class</SectionTitle>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Colleagues>
              {colleagues.map((colleague) => (
                <ColleagueAvatar
                  key={colleague.id}
                  src={
                    colleague.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(colleague.name)}`
                  }
                  alt={colleague.name}
                />
              ))}
            </Colleagues>
            {colleagues.length > 0 && <MoreLink>+{colleagues.length} more</MoreLink>}
          </div>
        </Details>
      </Content>
      </Page>
    </Container>
  )
}

export default TeacherProfile