import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SuburbRow from "../../components/SuburbRow/SuburbRow"
import Suburb from "../../models/suburb"
import { getSuburbsByName } from "../../services/suburbs";

type Props = {
    setNameQuery(nameQuery: string):void,
    suburbs: Array<Suburb>,
    setAdded(added: number): void, 
    added: number,
}

export type FormValues= {
    name: string,
}

export default function SuburbList({ setNameQuery, suburbs, setAdded, added }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        setNameQuery(data.name)
    }
    
    return (
       <div className="m-0 flex flex-col items-center w-full ">
            <div className="w-3/5">
                <h1 className="text-white text-5xl text-center tracking-[.05em] mt-4 font-bold">Suburb's List</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-4/5 mt-4 items-center">
                <div className="w-4/5 flex flex-row justify-items-start">
                    <label className="text-white">Search the suburb</label>
                </div>
                <div className="w-4/5 flex flex-col justify-items-start">
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
                <div className="w-4/5 flex flex-col justify-items-start">
                    <input
                        className="bg-fucsia p-3 text-white rounded-sm uppercase tracking-[.50em] w-4/5 hover:bg-fucsiaHover cursor-pointer"
                        type="submit" 
                        value="Search"
                    />
                </div>
                <div className="flex flex-col w-4/5 mt-6 items-center">
                    <input
                        className="bg-white p-3 text-dark rounded-sm w-4/5 mb-6 tracking-[.25em] hover:bg-grey cursor-pointer"
                        type="button"
                        onClick={() => {
                            reset();
                            setNameQuery("");
                        }}
                        value="Reset"
                    />
                </div>
            </form>

            <div className="w-3/5 bg-white rounded-md text-left p-5 border-grey border-2 m-6 ">
                <table className="w-full">
                    <tr className="w-2/5 text-2xl border-b border-fucsia ">
                        <th className="px-6 py-4 text-fucsia">#</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Postcode</th>
                    </tr>
                    {suburbs.length > 0 && 
                        suburbs.map((suburb) => {
                            return (
                                <SuburbRow
                                    suburb={suburb}
                                    key={suburb.id}
                                    setAdded={setAdded}
                                    added={added}
                                />
                            );
                        })    
                    }
                </table>
            </div>
       </div> 
    )
}