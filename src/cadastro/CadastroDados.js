import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import classes from './Cadastro.module.css'
import { pessoasActions } from '../store/proponenteReducers'
import { cepMask, cpfMask, cnpjMask, cpfFormat, cnpjFormat, clearFormat } from '../util/util'


const CadastroDados = props => {

    const dispatch = useDispatch()

    const initialState = {
        id: '',
        tpPessoa: '1',
        cpf_cnpj: '',
        nome: '',
        cep: '',
        endereco: '',
        complemento: '',
        bairro: '',
        municipio: '',
        uf: 'SC'
    }

    const location = useLocation()

    const [formData, setFormData] = useState(location.state || initialState)

    const textHandler = (event) => {

        let dataEntered = event.target.value

        if (event.target.name === 'tpPessoa') {
            if (event.target.id === 'tpPessoa1') {
                dataEntered = '1'
            } else {
                dataEntered = '2'
            }
        }

        if (event.target.name === 'cpf_cnpj') {
            if (formData.tpPessoa === '1') {
                dataEntered = cpfMask(event.target.value)
            } else {
                dataEntered = cnpjMask(event.target.value)
            }
        }

        if (event.target.name === 'cep') {
            dataEntered = cepMask(event.target.value)
            if (event.target.value.length === 9) {
                onBuscarCep(event.target.value)

            }
        }


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

    const onBuscarCep = cep => {

        console.log('cep...', cep)


        axios.get(`https://api.postmon.com.br/v1/cep/${cep}`)
            .then(resposta => {
                const { logradouro, bairro, cidade, estado } = resposta.data

                setFormData(
                    {
                        ...formData,
                        cep: cepMask(cep),
                        endereco: logradouro.toUpperCase(),
                        bairro: bairro.toUpperCase(),
                        municipio: cidade.toUpperCase(),
                        uf: estado.toUpperCase()
                    }
                )
            })
            .catch(err => {
                // Swal.fire({
                //     position: 'center',
                //     type: 'erro',
                //     title: 'CEP n??o encontrado',
                //     showConfirmButton: false,
                //     timer: 3000
                //     })
            })

    }

    return (
        <main>
            <h2>Cadastro - Dados</h2>
            <form onSubmit={submitHandler} className={classes.form}>

                {/* Tipo de Pessoa */}
                <div className={classes.inputBox}>
                    <label htmlFor="tpPessoa">Tipo de Pessoa:</label>
                    <div className={classes.radioBox}>
                        <div className={classes.radioBoxLinha}>
                            <input
                                type='radio'
                                name='tpPessoa'
                                id="tpPessoa1"
                                onChange={textHandler}

                                value={formData.tpPessoa}
                                checked={formData.tpPessoa === "1"}
                            /><label htmlFor="tpPessoa1">F??sica</label>

                        </div>
                        
                        <div className={classes.radioBoxLinha}>
                            <input
                                type='radio'
                                name='tpPessoa'
                                id="tpPessoa2"
                                onChange={textHandler}
                                value={formData.tpPessoa}
                                checked={formData.tpPessoa === "2"}
                            /><label htmlFor="tpPessoa2">Jur??dica</label>

                        </div>

                    </div>
                </div>

                {/* CPF / CNPJ */}
                <div className={classes.inputBox}>
                    <label htmlFor="nome">{formData.tpPessoa === '1' ? 'CPF:' : 'CNPJ:'}</label>
                    <input
                        className={classes.w40}
                        id="cpf_cnpj"
                        name="cpf_cnpj"
                        onChange={textHandler}
                        value={formData.cpf_cnpj}
                    />
                </div>

                {/* Nome / Raz??o Social */}
                <div className={classes.inputBox}>
                    <label htmlFor="nome">{formData.tpPessoa === '1' ? 'Nome:' : 'Raz??o Social:'}</label>
                    <input
                        id="nome"
                        name="nome"
                        onChange={textHandler}
                        value={formData.nome}
                    />
                </div>

                {/* CEP */}
                <div className={classes.inputBox}>
                    <label htmlFor="cep">CEP:</label>
                    <input
                        className={classes.w20}
                        id="cep"
                        name="cep"
                        onChange={textHandler}
                        value={formData.cep}
                    />
                </div>

                {/* Endere??o */}
                <div className={classes.inputBox}>
                    <label htmlFor="endereco">Endere??o:</label>
                    <input
                        id="endereco"
                        name="endereco"
                        onChange={textHandler}
                        value={formData.endereco}
                    />
                </div>

                {/* Complemento */}
                <div className={classes.inputBox}>
                    <label htmlFor="complemento">Complemento:</label>
                    <input
                        id="complemento"
                        name="complemento"
                        onChange={textHandler}
                        value={formData.complemento}
                    />
                </div>

                {/* Bairro */}
                <div className={classes.inputBox}>
                    <label htmlFor="bairro">Bairro:</label>
                    <input
                        id="bairro"
                        name="bairro"
                        onChange={textHandler}
                        value={formData.bairro}
                    />
                </div>

                {/* Munic??pio */}
                <div className={classes.inputBox}>
                    <label htmlFor="municipio">Munic??pio:</label>
                    <input
                        id="municipio"
                        name="municipio"
                        onChange={textHandler}
                        value={formData.municipio}
                    />
                </div>

                {/* Munic??pio */}
                <div className={classes.inputBox}>
                    <label htmlFor="uf">UF:</label>
                    <select
                        id="uf"
                        name="uf"
                        onChange={textHandler}
                        value={formData.uf}
                    >
                        <option value="SC">SANTA CATARINA</option>
                        <option value="AC">ACRE</option>
                        <option value="AL">ALAGOAS</option>
                        <option value="AP">AMAP??</option>
                        <option value="AM">AMAZONAS</option>
                        <option value="BA">BAHIA</option>
                        <option value="CE">CEAR??</option>
                        <option value="DF">DISTRITO FEDERAL</option>
                        <option value="ES">ESP??RITO SANTO</option>
                        <option value="GO">GOI??S</option>
                        <option value="MA">MARANH??O</option>
                        <option value="MT">MATO GROSSO</option>
                        <option value="MS">MATO GROSSO DO SUL</option>
                        <option value="MG">MINAS GERAIS</option>
                        <option value="PA">PAR??</option>
                        <option value="PB">PARA??BA</option>
                        <option value="PR">PARAN??</option>
                        <option value="PE">PERNAMBUCO</option>
                        <option value="PI">PIAU??</option>
                        <option value="RJ">RIO DE JANEIRO</option>
                        <option value="RN">RIO GRANDE DO NORTE</option>
                        <option value="RS">RIO GRANDE DO SUL</option>
                        <option value="RO">Rond??nia</option>
                        <option value="RR">Roraima</option>
                        <option value="SP">S??o Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>

                <div className={classes.botaoBox}>
                    {botao}
                </div>
            </form>

        </main>
    );
}

export default CadastroDados;