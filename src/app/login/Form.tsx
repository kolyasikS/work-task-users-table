'use client';
import React, {useCallback, useState} from 'react';
import styles from "./styles/auth-form.module.scss";
import {AuthController} from "@controllers/auth.controller";
import ClassicInput from "@shared/inputs/classic/ClassicInput";
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import ValidationError from "@shared/errors/ValidationError/ValidationError";
import {setUser} from "../../lib/store/slices/user.slice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import Loading from "@shared/animations/loading/Loading";

type SignInForm = {
    username: string;
    password: string;
}
const Form = () => {
    const [form, setForm] = useState<SignInForm>({
        username: 'testuser',
        password: 'testpassword123'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const signIn = async () => {
        if (!form.username || !form.password) {
            return;
        }

        setIsLoading(true);
        AuthController.login(form)
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    setIsLoading(false);
                } else {
                    // window.localStorage.setItem('access_token', res.access_token);
                    dispatch(setUser({
                        username: form.username
                    }));
                    window.localStorage.setItem('user', JSON.stringify({username: form.username}));
                    router.push('/table');
                }
            })

    }
    const setFormUsername = useCallback((value: string) => {
        setForm(user => ({...user, username: value}));
    }, []);
    const setFormPassword = useCallback((value: string) => {
        setForm(user => ({...user, password: value}));
    }, []);

    return (
        <div className={styles.form}>
            <div className={styles.form__inner}>
                <h2 className={styles.form__title}>Login</h2>
                <div className={styles.form__inputs}>
                    <ClassicInput
                        value={form.username}
                        setValue={setFormUsername}
                    >
                        Email
                    </ClassicInput>
                    <ClassicInput
                        value={form.password}
                        setValue={setFormPassword}
                    >
                        Password
                    </ClassicInput>
                </div>
                {error && <ValidationError>{error}</ValidationError>}
                <div className={styles.form__btns}>
                    <ClassicButton onClick={signIn}>Continue</ClassicButton>
                </div>
            </div>
            <Loading isLoading={isLoading}/>
        </div>
    );
};

export default Form;