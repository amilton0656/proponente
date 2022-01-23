import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import classes from './CadastroScreen.module.css'
import { pessoasActions } from '../store/proponenteReducers'

const CadastroScreen = props => {

    const dispatch = useDispatch()

    const initialState = {
        id: '',
        nome: '',
        email: '',
        telefone: ''

    }

    const location = useLocation()

    const [formData, setFormData] = useState(location.state || initialState)

    const textHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    const submitHandler = event => {
        event.preventDefault()


        dispatch(pessoasActions.addPessoa(formData))
        setFormData(initialState)
    }

    const editHandler = () => {
        
        dispatch(pessoasActions.editPessoa(formData))
        setFormData(initialState)
    }

    const botao = formData.id 
    ? <button type ="button" onClick = {editHandler}>Salvar</button>
    : <button type ="submit" >Salvar</button>


    return ( 
        <main>
            <h2>Cadastro</h2>
            <form onSubmit = {submitHandler} className={classes.form}>
                <div>
                    <label htmlFor = "nome">Nome:</label>
                    <input 
                        id = "nome" 
                        onChange= {textHandler}
                        value = {formData.nome}
                    />
                </div>
                <div>
                    <label htmlFor = "email">Email:</label>
                    <input 
                        id = "email" 
                        onChange= {textHandler}
                        value = {formData.email}
                    />
                </div>
                <div>
                    <label htmlFor = "telefone">Telefone:</label>
                    <input 
                        id = "telefone" 
                        onChange= {textHandler}
                        value = {formData.telefone}
                    />
                </div>
                <div>
                    {botao}
                </div>
            </form>
            
        </main>
     );
}
 
export default CadastroScreen;