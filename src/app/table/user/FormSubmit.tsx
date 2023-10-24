import React, {useCallback} from 'react';
import ClassicButton from "@shared/buttons/classic/ClassicButton";
import {formatYear} from "../../../lib/formatting/date";
import {TableController} from "@controllers/table.controller";
import {EditedUser, UsersFormEditingTypes} from "./UserEditing";
import DangerButton from "@shared/buttons/danger/DangerButton";


type FormSubmitProps = {
    editedUser: EditedUser,
    setIsLoading: (value: boolean) => void,
    setErrors: (value: any) => void,
    updatedSuccessfully: () => void,
    closeDialog: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const FormSubmit = ({editedUser,
                        setIsLoading,
                        setErrors,
                        closeDialog,
                        updatedSuccessfully,
                    }: FormSubmitProps) => {
    const apply = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const formattedBirthday = editedUser.birthday_date.split('-').map((item, ind) => {
            if (ind === 2) {
                return formatYear(item);
            } else {
                return item;
            }
        })
            .reverse()
            .join('-');
        if (!editedUser.address?.length) {
            delete editedUser.address;
        }

        setIsLoading(true)

        const submitPromise = editedUser.type === UsersFormEditingTypes.EDIT_USER
            ? TableController
                .update({...editedUser, birthday_date: formattedBirthday})
            : TableController
                .create({...editedUser, birthday_date: formattedBirthday})

        submitPromise
            .then(res => {
            if (!res.error) {
                setErrors({});
                updatedSuccessfully();
            } else {
                setIsLoading(false);
                setErrors(res.error);
            }
        })
    }, [editedUser]);

    const remove = useCallback((e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!editedUser.id) {
            return
        }

        setIsLoading(true)
        TableController
            .delete(editedUser.id)
            .then(res => {
                if (!res.error) {
                    setErrors({});
                    updatedSuccessfully();
                } else {
                    setIsLoading(false);
                    setErrors(res.error);
                }
            })
    }, [editedUser]);

    return (
        <>
            {editedUser.type !== UsersFormEditingTypes.CREATE_USER && <DangerButton onClick={remove}>Delete</DangerButton>}
            <ClassicButton onClick={closeDialog}>Cancel</ClassicButton>
            <ClassicButton onClick={apply}>Save</ClassicButton>
        </>
    );
};

export default FormSubmit;