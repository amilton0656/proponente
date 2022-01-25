import '../util/reset.css'
import classes from './Login.module.css'

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = props => {
    return (
        <div>
            {props.children}        
        </div>
    )
}

const Login = () => {
    return (
        <div>

            <form className={classes.form}>
            <div className={classes.item}>
                <label>Usuário:</label>
                <input 
                    type='text'
                />
            </div>

            <div className={classes.item}>
                <label>Senha:</label>
                <input 
                    type='password'
                />
            </div>

            <div className={classes.buttonBox}>
                <button className={classes.button}>Login</button>
            </div>
            
            
            </form>

        </div>

    )
}

export default Login