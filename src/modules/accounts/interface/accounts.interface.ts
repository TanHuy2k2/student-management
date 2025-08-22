import { Role } from "src/commons/enums/role.enum";

export interface AccountInterface {
    "id": number,
    "name": string,
    "email": string,
    "password": string,
    "image": string | null,
    "role": Role
}
