import {Label} from "@/shared";
import {RegisterForm} from "@/features";

export function RegisterWidget() {
    return (
        <div className={"flex flex-col justify-center items-center py-20"}>
            <Label>Register</Label>
            <RegisterForm/>
        </div>
    )
}