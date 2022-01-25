import '../util/reset.css'

import classes from './LoginScreen.module.css'

const FormScreen = () => {
    return (
        <div className={classes.main}>
            <form className={classes.form}>
                <fieldset>
                    <legend>Login</legend>
                    <div className={classes.inputBox}>
                        <input required id='usuario' className={classes.input} type='text' />
                        <label htmlFor='usuario' className={classes.labelInput}>Usuário..:</label>
                    </div>

                    <div className={classes.inputBox}>
                        <input autocomplete="off" required className={classes.input} type='password' />
                        <label className={classes.labelInput}>Senha:</label>
                    </div>


                    <button type='submit'>Entrar</button>

                </fieldset>

            </form>
        </div>

    );
}

export default FormScreen;