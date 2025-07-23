import { UserProfile } from "@/lib/models/user";
import { Roles } from "@/lib/models/role";


export const usersMock: UserProfile[] = [{
    id: 1,
    firstName: "Yevhenii",
    lastName: "Shcherbyna",
    email: "scherbinag2001@gmail.com",
    country: "Ukraine",
    city: "Odesa",
    street: "Kachins'kogo 7",
    age: 23,
    role: Roles.admin,
    isActive: true
}]