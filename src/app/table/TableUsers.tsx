'use client';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles/table.module.scss';
import {Table} from "@radix-ui/themes";
import {User} from "../../lib/entities/User";
import {useDispatch, useSelector} from "react-redux";
import {selectPage, selectRestrictions, selectUsers} from "../../lib/store/selectors/table.selectors";
import {setUsers} from "../../lib/store/slices/table.slice";
import {TableController} from "@controllers/table.controller";
import Loading from "@shared/animations/loading/Loading";
import UserEditing, {EditedUser, UsersFormEditingTypes} from "./user/UserEditing";
import * as uuid from 'uuid';
import {formatYear} from "../../lib/formatting/date";

type TableUsersProps = {
    serverUsers: User[];

}
const TableUsers = ({serverUsers}: TableUsersProps) => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const page = useSelector(selectPage);
    const {limit, offset} = useSelector(selectRestrictions);
    const [isLoading, setIsLoading] = useState(false);
    const [editingUser, setEditingUser] = useState<EditedUser | null>(null);

    useEffect(() => {
        if (!serverUsers || users.length) {
            setIsLoading(true);
        }
        fetchUsers();
    }, [page]);

    const fetchUsers = useCallback(() => {
        TableController
            .find({limit, offset})
            .then(res => {
                if (!res.error) {
                    setEditingUser(null);
                    dispatch(setUsers(res.results))
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [limit, offset]);

    const renderUsers = (users: User[]) => {
        const renderedUsers =  users.map((user: User) =>
                <Table.Row key={user.id} className={`${styles.table__row}`}
                           onClick={() => setEditingUser(user)}>
                    <Table.RowHeaderCell className={styles.table__cell}>{user.name}</Table.RowHeaderCell>
                    <Table.Cell className={styles.table__cell}>{formatYear(user.birthday_date)}</Table.Cell>
                    <Table.Cell className={styles.table__cell}>{user.email}</Table.Cell>
                    <Table.Cell className={styles.table__cell}>{user.phone_number}</Table.Cell>
                    <Table.Cell className={styles.table__cell}>{user.address}</Table.Cell>
                </Table.Row>
        );

        if (renderedUsers.length < 10) {
            while (renderedUsers.length < 10) {
                renderedUsers.push(
                    <Table.Row key={uuid.v4()} className={`${styles.table__row} ${styles.empty__row}`}>
                        <Table.RowHeaderCell className={styles.table__cell}></Table.RowHeaderCell>
                        {[...new Array(4)].map(() =>
                            <Table.Cell key={uuid.v4()} className={styles.table__cell}></Table.Cell>
                        )}
                    </Table.Row>
                );
            }
        }

        return renderedUsers;
    }
    return (
        <div className={'relative'}>
            <Table.Root variant={'surface'} className={styles.table}>
                <Table.Header>
                    <Table.Row className={`${styles.table__row} ${styles.table__header}`}>
                        <Table.ColumnHeaderCell className={styles.table__cell}>Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.table__cell}>Birthday</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.table__cell}>Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.table__cell}>Phone</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className={styles.table__cell}>Address</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderUsers(users.length ? users : serverUsers)}
                    <Table.Row key={uuid.v4()}
                               className={`${styles.table__row} ${styles.table__row_create}`}
                               onClick={() => setEditingUser({
                                   email: '',
                                   name: '',
                                   birthday_date: '',
                                   phone_number: '',
                                   address: '',
                                   type: UsersFormEditingTypes.CREATE_USER
                               })}
                    >
                        <Table.Cell className={`${styles.table__cell} ${styles.table__cell_create}`}
                                    colSpan={5}
                        >
                            <p className={'flex items-center justify-center gap-3 text-green-500 text-[16px]'}>New user <span className={styles.table__cell_create_plus}></span></p>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                {editingUser && <UserEditing
                    close={() => setEditingUser(null)}
                    user={{...editingUser, type: editingUser.type ?? UsersFormEditingTypes.EDIT_USER}}
                    updatedSuccessfully={fetchUsers}
                />}
            </Table.Root>
            <Loading isLoading={isLoading}/>
        </div>
    );
};

export default TableUsers;