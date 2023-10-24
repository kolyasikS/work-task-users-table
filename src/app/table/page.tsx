import React from 'react';
import {TableController} from "@controllers/table.controller";
import TableUsers from "./TableUsers";
import styles from './styles/table-section.module.scss';
import TableTitle from "./TableTitle";
import Pagination from "./pagination/Pagination";
import Myself from "./myself/Myself";

async function getFirstPageOfTable() {
    const {results: users, count} = await TableController.find({limit: 10, offset: 0});
    return {
        users,
        count
    };
}
const Page = async () => {
    const data = await getFirstPageOfTable();
    return (
        <section className={styles.table}>
            {data.users
                ? <>
                    <TableTitle/>
                    <TableUsers serverUsers={data.users}/>
                    <Pagination count={data.count}/>
                </>
                : <h1 className={'text-5xl font-bold text-red-700'}>No data</h1>
            }
            <Myself/>
        </section>
    );
};

export default Page;