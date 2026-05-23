import styled from "styled-components"

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    width: 100vw;
    background: #0000;

`

const Card = styled.div`

`
const Logo = styled.img`

`
const Input = styled.input`

`

const Button = styled.button`

`

function Login(){
    return(
        <Container>
            <Card>
                <Logo></Logo>
                <Input
                    type="email"
                    placeholder="Email"
                />
                <Input
                    type="password"
                    placeholder="Senha"
                />
                <Button>Entrar</Button>
                <link href="/cadastro">Nao tem conta? Cadastre-se aqui</link>
            </Card>
        </Container>      
    )
}

export default Login