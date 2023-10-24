'use client';

import React, {useCallback, useState} from 'react';
import {User} from "../../../lib/entities/User";
import ClassicDialog from "@shared/dialogs/classic/ClassicDialog";
import styles from '../styles/user-editing.module.scss';
import Loading from "@shared/animations/loading/Loading";
import Birthday from "./Birthday";
import FormSubmit from "./FormSubmit";
import ErrorWrapper from "./ErrorWrapper";

export enum UsersFormEditingTypes {
    CREATE_USER = 'create_user',
    EDIT_USER = 'edit_user',
}

export type EditedUser = Omit<User, 'address' | 'id'> & {
    address?: string;
    id?: number;
    type?: UsersFormEditingTypes;
}

type UserEditingProps = {
    user: EditedUser;
    close: () => void;
    updatedSuccessfully: () => void;
}
const UserEditing = ({user, close, updatedSuccessfully}: UserEditingProps) => {
    const [editedUser, setEditedUser] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const setUsername    = useCallback((value: string) => {
        setEditedUser(prev => ({...prev, name: value}));
    }, []);
    const setEmail       = useCallback((value: string) => {
        setEditedUser(prev => ({...prev, email: value}));
    }, []);
    const setPhoneNumber = useCallback((value: string) => {
        setEditedUser(prev => ({...prev, phone_number: value}));
    }, []);
    const setAddress     = useCallback((value: string) => {
        setEditedUser(prev => ({...prev, address: value}));
    }, []);
    const setBirthday    = useCallback((value: string, typeOfDate: number) => {
        setEditedUser(prev => {
            const birthday = prev.birthday_date.split('-');
            birthday[typeOfDate] = value;
            return {...prev, birthday_date: birthday.join('-')};
        });
    }, []);

    const cancel = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        close();
    }, []);

    const [errors, setErrors] = useState<any>({});
    return (
        <ClassicDialog onClick={close}>
            <div className={styles.rolls}>
                <div className={styles.roll__left}></div>
                <div className={styles.roll__right}></div>
            </div>
            <form className={styles.form}>
                <div className={styles.form__wrapper}>
                    <h2 className={styles.form__title}>{user.type === UsersFormEditingTypes.EDIT_USER ? 'Editing' : 'Creating'} user</h2>
                    <div className={styles.form__inner}>
                        <div className={styles.form__block}>
                            <ErrorWrapper
                                value={editedUser.name}
                                setValue={setUsername}
                                error={errors.name}
                                title={'Name'}
                            />
                            <ErrorWrapper
                                value={editedUser.phone_number}
                                setValue={setPhoneNumber}
                                error={errors.phone_number}
                                title={'Phone'}
                            />
                        </div>
                        <ErrorWrapper
                            value={editedUser.email}
                            setValue={setEmail}
                            error={errors.email}
                            title={'Email'}
                        />
                        <ErrorWrapper
                            value={editedUser.address}
                            setValue={setAddress}
                            error={errors.address}
                            title={'Address'}
                        />
                    </div>
                    <ErrorWrapper error={errors.birthday_date ?? errors.detail}>
                        <Birthday
                            day={editedUser.birthday_date.split('-')[0]}
                            month={editedUser.birthday_date.split('-')[1]}
                            year={editedUser.birthday_date.split('-')[2]}
                            setBirthday={setBirthday}
                        />
                    </ErrorWrapper>
                    <div className={styles.form__btns}>
                        <FormSubmit
                            editedUser={editedUser}
                            closeDialog={cancel}
                            setErrors={setErrors}
                            setIsLoading={setIsLoading}
                            updatedSuccessfully={updatedSuccessfully}
                        />
                    </div>
                </div>
                <Loading isLoading={isLoading}/>
            </form>
        </ClassicDialog>
    );
};

export default UserEditing;