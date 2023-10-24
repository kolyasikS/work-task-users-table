import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../entities/User';
export type Table = {
    page: number,
    limit: number,
    offset: number,
    users: User[]
}

const initialState: Table = {
    page: 0,
    limit: 10,
    offset: 0,
    users: [],
}
const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setUsers(state, action: {payload: User[]}) {
            const users = action.payload;

            state.users = users;
        },
        setPage(state, action: {payload: number}) {
            const page = action.payload;

            state.page = page;
            state.offset = page * state.limit;
        }
    }
});

export const {setUsers, setPage} = tableSlice.actions;
export default tableSlice.reducer;