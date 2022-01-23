import { Routes, Route } from 'react-router-dom'

import CadastroScreen from '../screens/CadastroScreen'
import ListaScreen from '../screens/ListaScreen'
import DetailScreen from '../screens/DetailScreen'
import Layout from '../screens/Layout'

const RotasProponente = () => {
    return ( 
        <Routes>
            {/* <Route path ="/" element = {<Layout />} /> */}
            <Route path ="/proponente/cadastro" element = {<CadastroScreen />} />
            <Route path ="/proponente/lista" element = {<ListaScreen />} />
            <Route path ="/proponente/:proponenteId" element = {<DetailScreen />} />
        </Routes>
     );
}
 
export default RotasProponente