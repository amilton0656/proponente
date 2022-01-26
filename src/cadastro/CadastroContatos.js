import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import classes from './Cadastro.module.css'
import { pessoasActions } from '../store/proponenteReducers'
import { cepMask, cpfMask, cnpjMask, cpfFormat, cnpjFormat, clearFormat } from '../util/util'


const CadastroContatos = props => {

    const dispatch = useDispatch()

    const initialState = {
        id_contato: '',
        id_tipo: '1',
        contato: '',
        observacao: '',
    }

    const location = useLocation()

    const [formData, setFormData] = useState(location.state || initialState)

    const textHandler = (event) => {

        let dataEntered = event.target.value

        setFormData({
            ...formData,
            [event.target.name]: dataEntered.toUpperCase()
        })
    }

    const submitHandler = event => {
        event.preventDefault()

        console.log(formData)

        // dispatch(pessoasActions.addPessoa(formData))
        setFormData(initialState)
    }

    const editHandler = () => {

        dispatch(pessoasActions.editPessoa(formData))
        setFormData(initialState)
    }

    const botao = formData.id
        ? <button type="button" onClick={editHandler}>Salvar</button>
        : <button type="submit" >Salvar</button>

   

    return (
        <main>
            <h2>Cadastro - Contatos</h2>
            <form onSubmit={submitHandler} className={classes.form}>

                {/* Tipo do Contato */}
                <div className={classes.inputBox}>
                    <label htmlFor="id_tipo">Tipo do Contato:</label>
                    <select
                        id="id_tipo"
                        name="id_tipo"
                        onChange={textHandler}
                        value={formData.id_tipo}
                    >
                        <option value="1">TELEFONE</option>
                        <option value="2">EMAIL</option>
                    </select>
                </div>

                {/* Contato */}
                <div className={classes.inputBox}>
                    <label htmlFor="contato">Contato:</label>
                    <input
                        id="contato"
                        name="contato"
                        onChange={textHandler}
                        value={formData.contato}
                    />
                </div>

                {/* Observação */}
                <div className={classes.inputBox}>
                    <label htmlFor="observacao">Observação:</label>
                    <input
                        id="observacao"
                        name="observacao"
                        onChange={textHandler}
                        value={formData.observacao}
                    />
                </div>

                <div className={classes.botaoBox}>
                    {botao}
                </div>
            </form>

        </main>
    );
}

export default CadastroContatos;