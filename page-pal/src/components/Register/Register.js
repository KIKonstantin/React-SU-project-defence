import { Link } from 'react-router-dom'
import styles from './Register.module.css'
import { useAuthContext } from '../../contexts/AuthContext'
import { useForm } from '../../hooks/useForm';

const RegisterFormKeys = {
    Email:'email',
    Username: 'username',
    Password: 'password',
    ConfirmPassword: 'confirmPassword'
}

export default function Register(){
    const { onRegisterSubmit } = useAuthContext()
    const {values, changeHandler, onSubmit } = useForm({
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    }, onRegisterSubmit);
    
    return(
        <section className={styles.loginSection}>
            {/* <img src="images/spiralNotebook.png" alt="spiralNotebook.png" className={styles.formBackground}/> */}
            <div className={styles.loginform}>
                <form id='login' method="post" onSubmit={onSubmit}>
                <div className={styles.loginformInput}>
                <h1>Register</h1>
                {/* <label htmlFor="email">Email:</label> */}
                <input
                    type="email"
                    id="email"
                    name={RegisterFormKeys.Email}
                    placeholder="myEmail@email.com"
                    value={values[RegisterFormKeys.Email]}
                    onChange={changeHandler}
                />
                {/* <label htmlFor="login-pass">Password:</label> */}
                <input
                    type="password"
                    id="login-password"
                    placeholder='Password'
                    name={RegisterFormKeys.Password}
                    value={values[RegisterFormKeys.Password]}
                    onChange={changeHandler}
                />
                {/* <label htmlFor="con-pass">Confirm Password:</label> */}
                <input
                type="password"
                name="confirmPassword"
                placeholder='Confirm Password'
                id="confirm-password"
                value={values[RegisterFormKeys.ConfirmPassword]}
                onChange={changeHandler}
                />
                <input type="submit" className={styles.loginBtn} value="Register"/>
                <p className={styles.field}>
                    <span>If you already have a profile click <Link to="/login">here</Link></span>
                </p>
                </div>

                </form>
            </div>
        </section>
    )

};