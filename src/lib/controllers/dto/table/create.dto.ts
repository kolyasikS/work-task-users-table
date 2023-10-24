import {offset} from "@floating-ui/core";

export type CreateUserDto = {
    name?: string;
    id?: number;
    email?: string;
    address?: string;
    birthday_date?: string;
    phone_number?: string;
}