import Header from '../components/Header';
import RotasProponente from '../routes/RotasProponente';

import classes from './Layout.module.css'

const proponente = {
    id: '1',
    nome: 'aaaa',
    email: '',
    telefone: ''

}

const Layout = () => {
    return ( 
        <main>
           <Header />
           <RotasProponente />
            

        </main>
     );
}
 
export default Layout;