import { Link } from 'react-router-dom'
import styles from './Register.module.css'
import { useAuthContext } from '../../contexts/AuthContext'
import { useForm } from '../../hooks/useForm';
import { useEffect, useState } from 'react';
import { MessageBox } from '../common/MessageBox';

const RegisterFormKeys = {
    Email:'email',
    Username: 'username',
    ImageUrl: 'imageUrl',
    FavoriteGenre: 'favoriteGenre',
    Password: 'password',
    ConfirmPassword: 'confirmPassword'
}



export default function Register(){
    const [selectedGenre, setSelectedGenre] = useState('');
    const { onRegisterSubmit, errors } = useAuthContext();
    const {values, changeHandler, onSubmit } = useForm({
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.ImageUrl]: '',
        [RegisterFormKeys.FavoriteGenre]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    }, onRegisterSubmit);
    

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
        changeHandler(event);
      };

    return(
        <section className={styles.loginSection}>
                   {errors && errors.map((m, i) =>(
                  <MessageBox message={m} id={i} />
            ))}
                <form id='login' method="post" onSubmit={onSubmit}>
                <div className={styles.loginformInput}>
                <h1>Register</h1>
                <input
                    type="text"
                    id="username"
                    name={RegisterFormKeys.Username}
                    placeholder="Username ^0^"
                    value={values[RegisterFormKeys.Username]}
                    onChange={changeHandler}
                />
                <input
                    type="email"
                    id="email"
                    name={RegisterFormKeys.Email}
                    placeholder="myEmail@email.com"
                    value={values[RegisterFormKeys.Email]}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    id="imageUrl"
                    name={RegisterFormKeys.ImageUrl}
                    placeholder="Photo URL"
                    value={values[RegisterFormKeys.ImageUrl]}
                    onChange={changeHandler}
                />
                <select
                id="favoriteGenre"
                name={RegisterFormKeys.FavoriteGenre}
                value={values[RegisterFormKeys.FavoriteGenre]}
                onChange={handleGenreChange}
                >
                    <option >Select your favorite genre</option>
                    <option value="mystery">Mystery</option>
                    <option value="romance">Romance</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Historical">Historical Fiction</option>
                    <option value="Young Adult">Young Adult</option>
                    <option value="Memoir">Memoir</option>
                    <option value="Biography">Biography</option>
                    <option value="Self Improvement">Self Improvement</option>
                </select>
                {selectedGenre && (
              <p>You selected {selectedGenre} as your favorite genre!</p>
            )}
                <input
                    type="password"
                    id="login-password"
                    placeholder='Password'
                    name={RegisterFormKeys.Password}
                    value={values[RegisterFormKeys.Password]}
                    onChange={changeHandler}
                />
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
     
        </section>
    )

};