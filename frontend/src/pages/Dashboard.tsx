import styled from "styled-components"
import Sidebar from "../components/Sidebar"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f4f7fb;
`

function Dashboard() {
  return (
    <Container>
      <Sidebar />

      <Content>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao painel.</p>
      </Content>
    </Container>
  )
}

export default Dashboard