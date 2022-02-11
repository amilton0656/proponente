import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { BiDetail } from 'react-icons/bi'



import classes from './ListaScreen.module.css'
import { pessoasActions } from '../store/proponenteReducers'

const ListaScreen = () => {

    const navigate = useNavigate()

    const pessoas = useSelector(state => state.pessoas.pessoas)

    const dispatch = useDispatch()

    const deletePessoaHandler = id => {
        console.log('disp', id)
        dispatch(pessoasActions.deletePessoa(id))
    }

    const editPessoaHandler = (id) => {
        console.log('sdjfsdlfjslkdf')

    }

    if (!pessoas) {
        return <div>Não há registros</div>
    }

    return ( 
        <main>
            <h2>Lista</h2>
        <ul className={classes.main}>
           {
               pessoas.map(pessoa => (
                   <div className={classes.item} key = {pessoa.id}>
                       <li >{pessoa.nome}</li>
                       <div>
                       <button onClick={() => deletePessoaHandler(pessoa.id)}><BsTrash /></button>
                       <button onClick={() => navigate('/proponente/cadastro', {state: pessoa})}><FaRegEdit /></button>
                       <button onClick={() => navigate(`/proponente/${pessoa.id}`, {state: pessoa})}><BiDetail /></button>
                       </div>
                   </div>
               )
               )
            }
        </ul>

        </main>
     );
    }
    
    export default ListaScreen;

    {/* <Link 
         to="/proponente/cadastro"  
         state={pessoa}
         className={navData => navData.isActive ? classes.xx : ''}
     ><FaRegEdit /></Link> */}