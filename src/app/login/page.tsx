import React from 'react';
import Form from "./Form";
import styles from './styles/login.module.scss';

const LoginPage = () => {
    return (
        <section className={styles.login}>
            <Form/>
        </section>
    )
};

export default LoginPage;