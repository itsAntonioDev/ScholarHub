import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"

const Container = styled.aside`

`

const LogoWrapper = styled.div`

`

const LogoIcon = styled.div`

`

const LogoText = styled.p`

`

const Nav = styled.nav`

`

const NavItem = styled.div`

`

const NavLabel = styled.span`

`

const Chevron = styled.span`

`

const Spacer = styled.div`

`

const Divider = styled.div`

`

const Badge = styled.span`

`

const menuItems = [
  { icon: "", label: "Dashboard", path: "/dashboard" },
  { icon: "", label: "Teachers", path: "/teachers" },
  { icon: "", label: "Students / Classes", path: "/students" },
  { icon: "", label: "Billing", path: "/billing" },
  { icon: "", label: "Settings", path: "/settings" },
  { icon: "", label: "Exams", path: "/exams" },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Container>
      <LogoWrapper>
        <LogoIcon>M</LogoIcon>

        <LogoText>SchoolarHub</LogoText>
      </LogoWrapper>

      <Nav>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <NavItem
              key={item.path}
              onClick={() => navigate(item.path)}
            >
          
              <NavLabel>{item.label}</NavLabel>

              {isActive && <Chevron>›</Chevron>}
            </NavItem>
          )
        })}
      </Nav>

      <Spacer />

      <Divider />

      <NavItem onClick={() => navigate("/features")}>
        <span></span>

        <NavLabel>Features</NavLabel>

        <Badge>NEW</Badge>
      </NavItem>
    </Container>
  )
}

export default Sidebar