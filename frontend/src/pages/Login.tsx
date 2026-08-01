import { useState } from "react"
import type { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { login } from "../services/routes/auth"

const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    width: 100vw;
    background: #fcfafa;
    gap: 1.5rem;
`

const Title = styled.h1 <{$fontSize?: string, $color?: string, $fontWeight?: string}>`
    color: ${props => props.$color || '#4f4f4f'}; 
    font-size: ${props => props.$fontSize};
    font-weight: ${props => props.$fontWeight};
`

const Card = styled.div`
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10rem;
    border-radius: .5rem;
    gap: 1rem;
`

const Input = styled.input`
    box-sizing: border-box;
    background-color: #fcfafa;
    border: 1px solid #a7a7a7;
    border-radius: 4px;
    padding: 12px 16px;
    color: #000000;
    font-size: 14px;
    outline: none;
    width: 100%;
`

const Button = styled.button`
    width: 100%;
    background-color: #2d88d4;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 14px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 8px;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`

const ErrorText = styled.p`
    color: #dc2626;
    font-size: 0.85rem;
    margin: -0.5rem 0 0;
    width: 100%;
    text-align: left;
`

const Link = styled.div`
    color:  #667085;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: .5rem;

`

function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: FormEvent) {
        e.preventDefault()
        setError(null)

        if (!email || !password) {
            setError("Preencha email e senha.")
            return
        }

        setLoading(true)

        try {
            const response = await login(email, password)

            const token = response.data?.token || response.data?.access_token
            if (token) {
                localStorage.setItem("token", token)
            }

            navigate("/dashboard")
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Email ou senha inválidos."
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return(
        <Container>
            <Title>Welcome, Log into you account</Title>
            <Card as="form" onSubmit={handleLogin}>
                <Title style={{"marginBottom": "1rem"}} $color="#667085"  $fontWeight="normal" $fontSize="1rem">It is our great pleasure to have you on board!</Title>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <ErrorText>{error}</ErrorText>}

                <Button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                </Button>
                <Link>You don't have an account? <p style={{'color': '#2d88d4', 'fontWeight': 'bold', 'cursor': 'pointer'}} onClick={() => navigate('/register')}>Sign up</p> </Link>
            </Card>
        </Container>      
    )
}

export default Login