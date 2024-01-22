import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAllSuburbs } from "../../services/suburbs";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

type Props = {
    showDataWhenLoggedIn: number;
    setShowDataWhenLoggedIn(added: number): void,
    setLoggedIn(loggedIn: boolean): void,

}

export type FormValues= {
    username: string,
    password: string,
}

const Login = ({ showDataWhenLoggedIn, setShowDataWhenLoggedIn, setLoggedIn }: Props) => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        event?.target.reset();
        try {
            if (error) {
                setError(false);
            } 
            // Save the credentials in local storage
            sessionStorage.setItem("credentials", btoa(`${data.username}:${data.password}`));
            // Check if the credentials are correct
            await getAllSuburbs();
            // Set a variable in the session storage to tell the application when the user is logged in
            sessionStorage.setItem("logged_in", "true");
            setLoggedIn(true);
            // Populate the suburb list
            setShowDataWhenLoggedIn(showDataWhenLoggedIn + 1);
            navigate("/suburbs-list");
            toast.info(`Welcome!😜`);
        } catch (err) {
            setError(true);
            setErrorMessage("Username or Password invalid");
        }
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="m-0 flex flex-col items-center w-3/5 xs:w-4/5 sm:w-4/5">
                <h2 className="text-white text-4xl xs:text-3xl sm:text-4xl tracking-[.05em] mt-4 font-bold text-center">Welcome to Postcode Search!</h2>
                <h2 className="text-white text-3xl xs:text-3xl sm:text-4xl tracking-[.05em] mt-5 font-bold text-center">Please Login:</h2>
                <div className="flex flex-col w-4/5 xs:w-full sm:w-full items-center mt-6">
                    <div className="w-4/5 xs:w-full sm:w-full flex flex-row justify-items-start">
                        <label className="text-white">Username</label>
                    </div>
                    <input
                        className="rounded-sm w-4/5 xs:w-full sm:w-full mt-2 p-2"
                        {...register("username",
                            {required: true}
                        )}
                        aria-invalid={errors.username ? "true" : "false"}
                        placeholder="E.g. user"

                    />
                    {errors.username?.type === "required" && (
                        <div className="w-4/5 xs:w-full sm:w-full flex flex-row justify-items-start">
                            <p className="text-red" role="alert">
                                Username is required
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-4 items-center">
                    <div className="w-4/5 xs:w-full sm:w-full flex flex-row justify-items-start">
                        <label className="text-white">Password</label>
                    </div>
                    <input
                        className="rounded-sm w-4/5 xs:w-full sm:w-full mt-2 p-2"
                        {...register("password",
                            {required: true}
                        )}
                        aria-invalid={errors.password ? "true" : "false"}
                        placeholder="E.g. password"
                    />
                    {errors.password?.type === "required" && (
                        <div className="w-4/5 xs:w-full sm:w-full flex flex-row justify-items-start">
                            <p className="text-red" role="alert">Password is required</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-8 items-center">
                    <input
                        className="bg-fucsia p-3 text-white rounded-sm uppercase tracking-[.50em] w-4/5 xs:w-full sm:w-full hover:bg-fucsiaHover cursor-pointer"
                        type="submit"
                        value="Login"
                    />
                </div>
                <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-6 items-center">
                    <input
                        className="bg-white p-3 text-dark rounded-sm w-4/5 xs:w-full sm:w-full mb-6 tracking-[.25em] hover:bg-grey cursor-pointer"
                        type="button"
                        onClick={() => reset()}
                        value="Reset"
                    />
                </div>
                {errorMessage && (
                    <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-6 items-center">
                        <p className="text-2xl text-red">{errorMessage}</p>
                    </div>
                )}


            </form>
        </div>
    )
}

export default Login;
