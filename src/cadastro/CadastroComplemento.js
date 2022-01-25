import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import classes from './Cadastro.module.css'
import { pessoasActions } from '../store/proponenteReducers'
import { cepMask, cpfMask, cnpjMask, cpfFormat, cnpjFormat, clearFormat } from '../util/util'


const CadastroComplemento = props => {

    const dispatch = useDispatch()

    const initialState = {
        id: '',
        data_nascimento: '',
        nacionalidade: '',
        sexo: '1',
        estadocivil: '1',
        uniao_estavel: '0',
        conjuge_nome: '',
        conjuge_cpf: '',
        regime_casamento: '2',
        data_casamento: '',
        pacto_nupcial: '',
        profissao: '',
        numero_dependentes: '',
        rg: '',
        orgao_emissor_uf: '',
        empresa_nome: '',
        cargo: '',
        tempo_empresa: '',

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
                //     title: 'CEP não encontrado',
                //     showConfirmButton: false,
                //     timer: 3000
                //     })
            })

    }

    return (
        <main>
            <h2>Cadastro - Complemento</h2>
            <form onSubmit={submitHandler} className={classes.form}>

                {/* Data de Nascimento */}
                <div className={classes.inputBox}>
                    <label htmlFor="data_nascimento">Data de Nascimento:</label>
                    <input
                        className={classes.w40}
                        type='date'
                        id="data_nascimento"
                        name="data_nascimento"
                        onChange={textHandler}
                        value={formData.data_nascimento}
                    />
                </div>

                {/* Nacionalidade */}
                <div className={classes.inputBox}>
                    <label htmlFor="nacionalidade">Nacionalidade:</label>
                    <input
                        id="nacionalidade"
                        name="nacionalidade"
                        onChange={textHandler}
                        value={formData.nacionalidade}
                    />
                </div>

                {/* Sexo */}
                <div className={classes.inputBox}>
                    <label htmlFor="sexo">Sexo:</label>
                    <div className={classes.radioBox}>
                        <input
                            type='radio'
                            name='sexo'
                            id="sexo1"
                            onChange={textHandler}

                            value={formData.sexo}
                            checked={formData.sexo === "1"}
                        /><label htmlFor="sexo1">Masculino</label>
                        <input
                            type='radio'
                            name='sexo'
                            id="sexo2"
                            onChange={textHandler}
                            value={formData.sexo}
                            checked={formData.sexo === "2"}
                        /><label htmlFor="sexo2">Feminino</label>

                    </div>
                </div>

                {/* Estado Civil */}
                <div className={classes.inputBox}>
                    <label htmlFor="sexo">Estado Civil:</label>
                    <div className={classes.radioBox}>
                        <input
                            type='radio'
                            name='estadocivil'
                            id="estadocivil1"
                            onChange={textHandler}

                            value={formData.estadocivil}
                            checked={formData.estadocivil === "1"}
                        /><label htmlFor="estadocivil1">Solteiro(a)</label>
                        <input
                            type='radio'
                            name='estadocivil'
                            id="estadocivil2"
                            onChange={textHandler}
                            value={formData.estadocivil}
                            checked={formData.estadocivil === "2"}
                        /><label htmlFor="estadocivil2">Casado(a)</label>
                        <input
                            type='radio'
                            name='estadocivil'
                            id="estadocivil3"
                            onChange={textHandler}
                            value={formData.estadocivil}
                            checked={formData.estadocivil === "2"}
                        /><label htmlFor="estadocivil3">Separado(a)</label>
                        <input
                            type='radio'
                            name='estadocivil'
                            id="estadocivil4"
                            onChange={textHandler}
                            value={formData.estadocivil}
                            checked={formData.estadocivil === "2"}
                        /><label htmlFor="estadocivil4">Divorciado(a)</label>
                        <input
                            type='radio'
                            name='estadocivil'
                            id="estadocivil5"
                            onChange={textHandler}
                            value={formData.estadocivil}
                            checked={formData.estadocivil === "2"}
                        /><label htmlFor="estadocivil5">Viúvo(a)</label>

                    </div>
                </div>

                {/* União Estável */}
                <div className={classes.checkboxBox}>
                    <div>
                    <input
                        type='checkbox'
                        className={classes.w40}
                        id="uniao_estavel"
                        name="uniao_estavel"
                        onChange={textHandler}
                        value={formData.uniao_estavel}
                    />
                    <label htmlFor="uniao_estavel">União Estável:</label>

                    </div>
                </div>

                {/* Nome do Cônjuge */}
                <div className={classes.inputBox}>
                    <label htmlFor="nome">Nome do Cônjuge</label>
                    <input
                        id="conjuge_nome"
                        name="conjuge_nome"
                        onChange={textHandler}
                        value={formData.conjuge_nome}
                    />
                </div>

                {/* CPF do Cônjuge */}
                <div className={classes.inputBox}>
                    <label htmlFor="conjuge_cpf">CPF do Cônjuge:</label>
                    <input
                        className={classes.w20}
                        id="conjuge_cpf"
                        name="conjuge_cpf"
                        onChange={textHandler}
                        value={formData.conjuge_cpf}
                    />
                </div>

                {/* Regime de Casamento */}
                <div className={classes.inputBox}>
                    <label htmlFor="regime_casamento">Regime de Casamento:</label>
                    <div className={classes.radioBox}>
                        <input
                            type='radio'
                            name='regime_casamento'
                            id="regime_casamento1"
                            onChange={textHandler}

                            value={formData.regime_casamento}
                            checked={formData.regime_casamento === "1"}
                        /><label htmlFor="regime_casamento1">Comunhão Universal de Bens</label>
                        <input
                            type='radio'
                            name='regime_casamento'
                            id="regime_casamento2"
                            onChange={textHandler}
                            value={formData.regime_casamento}
                            checked={formData.regime_casamento === "2"}
                        /><label htmlFor="regime_casamento2">Comunhão Parcial de Bens</label>
                        <input
                            type='radio'
                            name='regime_casamento'
                            id="regime_casamento1"
                            onChange={textHandler}

                            value={formData.regime_casamento}
                            checked={formData.regime_casamento === "1"}
                        /><label htmlFor="regime_casamento3">Separação de Bens</label>
                        <input
                            type='radio'
                            name='regime_casamento'
                            id="regime_casamento2"
                            onChange={textHandler}
                            value={formData.regime_casamento}
                            checked={formData.regime_casamento === "2"}
                        /><label htmlFor="regime_casamento4">Outros</label>
                    </div>
                </div>

                {/* Data do Casamento */}
                <div className={classes.inputBox}>
                    <label htmlFor="data_casamento">Data do Casamento:</label>
                    <input
                        className={classes.w40}
                        type='date'
                        id="data_casamento"
                        name="data_casamento"
                        onChange={textHandler}
                        value={formData.data_casamento}
                    />
                </div>

                {/* Pacto Antenupcial */}
                <div className={classes.inputBox}>
                    <label htmlFor="pacto_nupcial">Pacto Antenupcial:</label>
                    <textarea
                        type='text'
                        cols="40" 
                        rows="5" 
                        id="pacto_nupcial"
                        name="pacto_nupcial"
                        onChange={textHandler}
                        value={formData.pacto_nupcial}
                    />
                </div>

                {/* Profissão */}
                <div className={classes.inputBox}>
                    <label htmlFor="profissao">Profissão:</label>
                    <input
                        id="profissao"
                        name="profissao"
                        onChange={textHandler}
                        value={formData.profissao}
                    />
                </div>

                {/* Número de Dependentes */}
                <div className={classes.inputBox}>
                    <label htmlFor="numero_dependentes">Número de Dependentes:</label>
                    <input
                        id="numero_dependentes"
                        name="numero_dependentes"
                        onChange={textHandler}
                        value={formData.numero_dependentes}
                    />
                </div>

                {/* Número do RG */}
                <div className={classes.inputBox}>
                    <label htmlFor="rg">Número do RG:</label>
                    <input
                        id="rg"
                        name="rg"
                        onChange={textHandler}
                        value={formData.rg}
                    />
                </div>

               {/* Data da Expedição */}
               <div className={classes.inputBox}>
                    <label htmlFor="data_expedicao">Data da Expedição:</label>
                    <input
                        className={classes.w40}
                        type='date'
                        id="data_expedicao"
                        name="data_expedicao"
                        onChange={textHandler}
                        value={formData.data_expedicao}
                    />
                </div>

                 {/* Órgao Emissor / UF */}
                 <div className={classes.inputBox}>
                    <label htmlFor="orgao_emissor_uf">Órgão Emissor / UF:</label>
                    <input
                        id="orgao_emissor_uf"
                        name="orgao_emissor_uf"
                        onChange={textHandler}
                        value={formData.orgao_emissor_uf}
                    />
                </div>

                {/* Empresa onde trabalha */}
                <div className={classes.inputBox}>
                    <label htmlFor="empresa_nome">Empresa onde trabalha:</label>
                    <input
                        id="empresa_nome"
                        name="empresa_nome"
                        onChange={textHandler}
                        value={formData.empresa_nome}
                    />
                </div>

                 {/* Cargo */}
                 <div className={classes.inputBox}>
                    <label htmlFor="cargo">Cargo:</label>
                    <input
                        id="cargo"
                        name="cargo"
                        onChange={textHandler}
                        value={formData.cargo}
                    />
                </div>

                {/* Tempo na Empresa */}
                <div className={classes.inputBox}>
                    <label htmlFor="tempo_empresa">Tempo na Empresa:</label>
                    <input
                        id="tempo_empresa"
                        name="tempo_empresa"
                        onChange={textHandler}
                        value={formData.tempo_empresa}
                    />
                </div>

                {/* Renda Familiar */}
                <div className={classes.inputBox}>
                    <label htmlFor="remuneracao">Renda Familiar:</label>
                    <input
                        id="remuneracao"
                        name="remuneracao"
                        onChange={textHandler}
                        value={formData.remuneracao}
                    />
                </div>

                {/* Tempo na Empresa */}
                <div className={classes.inputBox}>
                    <label htmlFor="tempo_empresa">Tempo na Empresa:</label>
                    <input
                        id="tempo_empresa"
                        name="tempo_empresa"
                        onChange={textHandler}
                        value={formData.tempo_empresa}
                    />
                </div>

                {/* Tempo na Empresa */}
                <div className={classes.inputBox}>
                    <label htmlFor="tempo_empresa">Tempo na Empresa:</label>
                    <input
                        id="tempo_empresa"
                        name="tempo_empresa"
                        onChange={textHandler}
                        value={formData.tempo_empresa}
                    />
                </div>

                {/* Tempo na Empresa */}
                <div className={classes.inputBox}>
                    <label htmlFor="tempo_empresa">Tempo na Empresa:</label>
                    <input
                        id="tempo_empresa"
                        name="tempo_empresa"
                        onChange={textHandler}
                        value={formData.tempo_empresa}
                    />
                </div>

                <div className={classes.botaoBox}>
                    {botao}
                </div>
            </form>

        </main>
    );
}

export default CadastroComplemento;