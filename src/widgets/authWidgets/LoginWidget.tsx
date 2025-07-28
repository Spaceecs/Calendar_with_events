import {LoginForm} from "@/features";
import {Label} from "@/shared";

export function LoginWidget() {
    return (
        <div className={"flex flex-col justify-center items-center py-20"}>
            <Label>Login</Label>
            <LoginForm/>
        </div>
    )
}