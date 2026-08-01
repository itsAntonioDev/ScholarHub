import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"

const Container = styled.aside`
  background-color: #1a1f4e;
  width: 220px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 24px 0 20px;
  font-family: 'Inter', sans-serif;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #6c63ff 0%, #a78bfa 100%);
    border-radius: 0 2px 2px 0;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 20px 28px;
`

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: black; 
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -1px;
  box-shadow: 0 4px 16px rgba(108, 99, 255, 0.4);
`

const LogoText = styled.p`
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.2px;
  opacity: 0.85;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 12px;
  flex: 1;
`

const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
  position: relative;
  background: ${({ $active }) => ($active ? "rgba(108, 99, 255, 0.25)" : "transparent")};

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(108, 99, 255, 0.25)" : "rgba(255, 255, 255, 0.06)"};
  }
`

const NavIcon = styled.span`
  font-size: 17px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.75;
  flex-shrink: 0;
`

const NavLabel = styled.span<{ $active?: boolean }>`
  font-size: 13.5px;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active }) => ($active ? "#fff" : "#94a3b8")};
  flex: 1;
  letter-spacing: 0.1px;
  transition: color 0.18s;
`

const Chevron = styled.span`
  color: #fff;
  font-size: 18px;
  opacity: 0.7;
  margin-left: auto;
`

const Spacer = styled.div`
  flex: 1;
`

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 12px 20px;
`

const Badge = styled.span`
  background: linear-gradient(135deg, #6c63ff, #a78bfa);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.8px;
  padding: 2px 6px;
  border-radius: 20px;
  text-transform: uppercase;
  margin-left: auto;
`


const menuItems = [
  { icon: "", label: "Dashboard", path: "/dashboard" },
  { icon: "", label: "Teachers", path: "/teachers" },
  { icon: "", label: "Students/ classes", path: "/students" },
  { icon: "", label: "Billing", path: "/billing" },
  { icon: "", label: "Settings and profile", path: "/settings" },
  { icon: "", label: "Exams", path: "/exams" },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Container>
      <LogoWrapper>
        <LogoIcon>S</LogoIcon>
        <LogoText>ScholarHub</LogoText>
      </LogoWrapper>

      <Nav>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <NavItem
              key={item.path}
              $active={isActive}
              onClick={() => navigate(item.path)}
            >
              <NavIcon>{item.icon}</NavIcon>
              <NavLabel $active={isActive}>{item.label}</NavLabel>
              {isActive && <Chevron>›</Chevron>}
            </NavItem>
          )
        })}
      </Nav>

      <Spacer />
      <Divider />

      <Nav>
        <NavItem onClick={() => navigate("/features")}>
          <NavIcon></NavIcon>
          <NavLabel>Features</NavLabel>
          <Badge>NEW</Badge>
        </NavItem>
      </Nav>
    </Container>
  )
}

export default Sidebar