import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { UserPlus, Landmark, GraduationCap, Bell, Headphones, ChevronUp } from "lucide-react"
import Sidebar from "../components/Sidebar"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f4f7fb;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2.5rem;
`

const Notice = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  max-width: 480px;

  strong {
    color: #334155;
    font-weight: 500;
  }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`

const BellButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #64748b;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`

const Dot = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4f5fea;
`

const LogoutButton = styled.button`
  background: #4f5fea;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #3f4dd4;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`

const Subdomain = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  margin: 0.5rem 0 3rem;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  max-width: 520px;
`

const Card = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1.25rem;
  cursor: pointer;
  transition: border-color 0.15s ease, transform 0.15s ease;
  font: inherit;

  &:hover {
    border-color: #4f5fea;
    transform: translateY(-2px);
  }
`

const IconWrap = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #eef0fd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f5fea;
`

const CardTitle = styled.h2`
  font-size: 1.05rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
`

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0.35rem 0 0;
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

const cards = [
  {
    icon: UserPlus,
    title: "Adicionar outros admins",
    description:
      "Convide outras pessoas para ajudar a gerenciar a escola, criar turmas e acompanhar os alunos.",
    path: "/teachers/add",
  },
  {
    icon: Landmark,
    title: "Adicionar salas",
    description:
      "Crie salas de aula e organize seus cursos e conteúdos por turma.",
    path: "/classes/add",
  },
  {
    icon: GraduationCap,
    title: "Adicionar alunos",
    description:
      "Cadastre seus alunos e dê a eles acesso às turmas e conteúdos da escola.",
    path: "/students/add",
  },
]

function Dashboard() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  function handleSupport() {
    navigate("/suporte")
  }

  function handleNotifications() {
    navigate("/notificacoes")
  }

  return (
    <Container>
      <Sidebar />

      <Content>
        <Header>
          <Notice>
            O melhor site para gerenciamentos de escolas
          </Notice>

          <HeaderActions>
            <BellButton aria-label="Notificações" onClick={handleNotifications}>
              <Bell size={18} />
              <Dot />
            </BellButton>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </HeaderActions>
        </Header>

        <Main>
          <Title>Bem-vindo ao painel.</Title>
          <Subdomain>xxxxxxxxx@gmail.com</Subdomain>

          <CardList>
            {cards.map(({ icon: Icon, title, description, path }) => (
              <Card key={title} onClick={() => navigate(path)}>
                <IconWrap>
                  <Icon size={20} />
                </IconWrap>
                <div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
              </Card>
            ))}
          </CardList>
        </Main>
      </Content>

      <SupportButton onClick={handleSupport}>
        <Headphones size={16} />
        Suporte
        <ChevronUp size={16} />
      </SupportButton>
    </Container>
  )
}

export default Dashboard