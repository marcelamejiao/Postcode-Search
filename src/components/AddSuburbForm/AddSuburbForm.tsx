import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createSuburb } from "../../services/suburbs";

export type IFormValues= {
    name: string,
    postcode: string,
}

type Props = {
    setAdded(added: number): void, 
    added: number,
}

export default function AddSuburnForm({ setAdded, added }: Props) {
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IFormValues>()

    const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        event?.target.reset();
        try {
            if (error) {
                setError(false);
            } 
            await createSuburb(data);
            setAdded(added + 1);
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="m-0 flex flex-col items-center w-3/5 ">
                <h2 className="text-white text-5xl tracking-[.05em] mt-4">Create a Suburb</h2>
                <div className="flex flex-col w-4/5 items-center mt-6">
                    <div className="w-4/5 flex flex-row justify-items-start">
                        <label className="text-white">Suburb's name:</label>
                    </div>
                    <input
                        className="rounded-sm w-4/5 mt-2 p-2"
                        {...register("name",
                            {required: true}
                        )}
                        aria-invalid={errors.name ? "true" : "false"}

                    />
                    {errors.name?.type === "required" && (
                        <div className="w-4/5 flex flex-row justify-items-start">
                            <p className="text-red" role="alert">
                                Name is required
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-4/5 mt-4 items-center">
                    <div className="w-4/5 flex flex-row justify-items-start">
                        <label className="text-white">Suburb's postcode:</label>
                    </div>
                    <input
                        className="rounded-sm w-4/5 mt-2 p-2"
                        {...register("postcode",
                            {required: true}
                        )}
                        aria-invalid={errors.postcode ? "true" : "false"}
                    />
                    {errors.postcode?.type === "required" && (
                        <div className="w-4/5 flex flex-row justify-items-start">
                            <p className="text-red" role="alert">Postcode is required</p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-4/5 mt-8 items-center">
                    <input
                        className="bg-fucsia p-3 text-white rounded-sm uppercase tracking-[.50em] w-4/5 hover:bg-fucsiaHover cursor-pointer"
                        type="submit"
                        value="Save"
                    />
                </div>
                <div className="flex flex-col w-4/5 mt-6 items-center">
                    <input
                        className="bg-white p-3 text-dark rounded-sm w-4/5 mb-6 tracking-[.25em] hover:bg-grey cursor-pointer"
                        type="button"
                        onClick={() => reset()}
                        value="Reset"
                    />
                </div>
            </form>
        </div>
    )
}
