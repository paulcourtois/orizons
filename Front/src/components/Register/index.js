import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from '../PageTitle';
import RegisterForm from './RegisterForm';

const Register = (props) => (
  <>
  <Title texte="Inscrivez-vous pour créer votre premier carnet !" />
  <RegisterForm
    nickname={props.nickname}
    last_name={props.last_name}
    first_name={props.first_name}
    email={props.email}
    password={props.password}
    passwordRepeat={props.passwordRepeat}
    changeField={props.changeField}
    errorMessage={props.errorMessage}
    isSuccessful={props.isSuccessful}
    handleRegister={props.handleRegister}
    isLoading={props.isLoading}
  />
  <p className="text-center m-3">Vous êtes déjà inscrit ? <Link to="/connexion">Connectez-vous !</Link></p>
  </>
);

Register.propTypes = {
  nickname: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
  handleRegister: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Register;