import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createSuburb } from "../../services/suburbs";

export type IFormValues= {
    name: string,
    postcode: string,
}

export default function AddSuburnForm() {
    const [error, setError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormValues>()

    const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        try {
            if (error) {
                setError(false);
            } 
        await createSuburb(data);
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
                            Suburb's name is required
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
                            Suburb's postcode is required
                        </p>
                    )}
                </div>
                <div>
                    <input
                        type="submit"
                        value="Save"
                    />
                </div>
            </form>
        </div>
    )
}
