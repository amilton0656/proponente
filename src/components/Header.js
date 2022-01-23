import { Link, NavLink } from 'react-router-dom'
import classes from './Header.module.css'


const Header = props => {
    return ( 
        <header className={classes.container}>
        <div className={classes.logo}>
            COTA
        </div>
        <ul className={classes.items}>
            <li className={classes.item}>
            <NavLink to="/proponente/cadastro">Cadastro</NavLink>
            </li>
            <li className={classes.item}>
            <NavLink to="/proponente/lista">Lista</NavLink>
            </li>
        </ul>
    </header>
     )
}
 
export default Header