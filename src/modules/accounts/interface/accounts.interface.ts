import { Role } from "src/commons/enums/role.enum";

export interface AccountsInterface {
    "id": number,
    "name": string,
    "email": string,
    "password": string,
    "image": string | null,
    "role": Role
}
