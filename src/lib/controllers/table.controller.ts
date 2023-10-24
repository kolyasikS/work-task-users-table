import $api from "../http";
import axios from "axios";
import {UpdateUserDto} from "@controllers/dto/table/update.dto";
import {FindAllDto} from "@controllers/dto/table/find-all.dto";
import {CreateUserDto} from "@controllers/dto/table/create.dto";

export class TableController {
    static async find({limit, offset}: FindAllDto) {
        try {
            const response = await $api.get('table/',{
                params: {
                    limit,
                    offset
                },
                timeout: 5000
            });

            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }

    static async update(updateUserDto: UpdateUserDto) {
        try {
            const id = updateUserDto.id;
            console.log(updateUserDto);
            const response = await $api.patch(`table/${id}/`,{
                ...updateUserDto
            }, {
                timeout: 5000,
            });

            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error
                        ?? e?.response?.data
                        ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
    static async create(createUserDto: CreateUserDto) {
        try {
            const response = await $api.post(`table/`,{
                ...createUserDto
            }, {
                timeout: 5000,
            });
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error
                        ?? e?.response?.data
                        ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
    static async delete(id: number) {
        try {
            const response = await $api.delete(`table/${id}/`, {
                timeout: 5000,
            });
            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.error
                        ?? e?.response?.data
                        ?? 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
}