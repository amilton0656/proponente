import { Routes, Route } from 'react-router-dom'

import CadastroDados from '../cadastro/CadastroDados'
import CadastroComplemento from '../cadastro/CadastroComplemento'
import ListaScreen from '../screens/ListaScreen'
import DetailScreen from '../screens/DetailScreen'
import Layout from '../screens/Layout'

const RotasProponente = () => {
    return ( 
        <Routes>
            {/* <Route path ="/" element = {<Layout />} /> */}
            <Route path ="/proponente/cadastrodados" element = {<CadastroDados />} />
            <Route path ="/proponente/cadastrocontatos" element = {<CadastroDados />} />
            <Route path ="/proponente/cadastrocomplemento" element = {<CadastroComplemento />} />
            <Route path ="/proponente/lista" element = {<ListaScreen />} />
            <Route path ="/proponente/:proponenteId" element = {<DetailScreen />} />
        </Routes>
     );
}
 
export default RotasProponente