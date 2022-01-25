import classes from './Login2.module.css'
const Login2 = () => {
    return (
        <main className={classes.container}>
            <h2>Login</h2>
            <form autocomplete="false">
                <div className={classes.inputfield}>
                    <input
                        type='text'
                        name='nome'
                        id='nome'
                        placeholder='Entre com seu nome'
                        // autocomplete="false"
                    />
                    <div className={classes.underline}></div>
                </div>

                <div className={classes.inputfield}>
                    <input
                        type='password'
                        name='senha'
                        id='senha'
                        placeholder='Entre com sua senha'
                        // autocomplete="false"
                    />
                    <div className={classes.underline}></div>
                </div>


                <input type='submit' value='Continue' />

            </form>
        </main>
    )
}

export default Login2