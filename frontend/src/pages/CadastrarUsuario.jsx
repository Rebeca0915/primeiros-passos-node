import {useState} from 'react';


export default function CadastrarUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState('')

    function cadastrar(evento){
        evento.preventDefault()

        setMensagem('')
        setErro('')

        if(senha !== confirmarSenha){
            setErro('As senhas não conferem')
            return
        }

        setMensagem('Usuário cadastrado com sucesso!')

    }

    return (
        <div>
            <h1>Cadastrar Usuário</h1>
            <form>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}