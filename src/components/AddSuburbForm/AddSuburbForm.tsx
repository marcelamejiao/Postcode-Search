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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Create a suburb</h2>
                <div>
                    <label>Suburb's name:</label>
                    <input
                        {...register("name",
                            {required: true}
                        )}
                        aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name?.type === "required" && (
                        <p role="alert">
                            Name is required
                        </p>
                    )}
                </div>
                <div>
                    <label>Suburb's postcode:</label>
                    <input
                        {...register("postcode",
                            {required: true}
                        )}
                        aria-invalid={errors.postcode ? "true" : "false"}
                    />
                    {errors.postcode?.type === "required" && (
                        <p role="alert">
                            Postcode is required
                        </p>
                    )}
                </div>
                <div>
                    <input
                        type="submit"
                        value="Save"
                    />
                </div>
                <input
                    type="button"
                    onClick={() => reset()}
                    value="Reset"
                />
            </form>
        </div>
    )
}
