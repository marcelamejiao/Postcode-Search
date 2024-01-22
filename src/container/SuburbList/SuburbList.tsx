import { useForm, SubmitHandler } from "react-hook-form";
import SuburbRow from "../../components/SuburbRow/SuburbRow"
import Suburb from "../../models/suburb"

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
    let errorMessage = '';
    if (suburbs.length === 0) {
        errorMessage = "There are not suburbs created with this name or postcode";
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        setNameQuery(data.name); 
    }
    
    return (
       <div className="m-0 flex flex-col items-center w-full ">
            <div className="w-3/5">
                <h1 className="text-white text-5xl xs:text-3xl sm:text-4xl text-center tracking-[.05em] mt-4 font-bold">Suburb's List</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-4/5 mt-4 items-center">
                <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-6 items-center">
                    <input
                        className="rounded-sm w-4/5 xs:w-full sm:w-full mt-2 p-2"
                        {...register("name",
                            {required: true}
                        )}
                        aria-invalid={errors.name ? "true" : "false"}
                        placeholder="Search suburb by name or postcode"
                    />
                    {errors.name?.type === "required" && (
                        <div className="w-4/5 xs:w-full sm:w-full flex flex-row justify-items-start">
                            <p className="text-red" role="alert">
                                Please enter a name or postcode
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-6 items-center">
                    <input
                        className="bg-fucsia p-3 text-white rounded-sm uppercase tracking-[.50em] w-4/5 xs:w-full sm:w-full hover:bg-fucsiaHover cursor-pointer"
                        type="submit" 
                        value="Search"
                    />
                </div>
                <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-6 items-center">
                    <input
                        className="bg-white p-3 text-dark rounded-sm w-4/5 xs:w-full sm:w-full mb-6 tracking-[.25em] hover:bg-grey cursor-pointer"
                        type="button"
                        onClick={() => {
                            reset();
                            setNameQuery("");
                        }}
                        value="Reset"
                    />
                </div>
                {errorMessage && (
                    <div className="flex flex-col w-4/5 xs:w-full sm:w-full mt-6 items-center">
                        <p className="text-2xl text-red">{errorMessage}</p>
                    </div>
                )}
            </form>

            <div className="truncate w-3/5 xs:w-5/6 sm:w-5/6 xs:overflow-x-scroll sm:overflow-x-scroll p-5 xs:p-1 sm:p-1 m-6 xs:mb-4sm:mb-4 bg-white rounded-md text-left  border-grey border-2">
                <table className="w-full">
                    <tr className="w-2/5 sm:w-full sm:text-sm xs:text-sm text-2xl border-b border-fucsia">
                        <th className="px-6 xs:px-1 sm:px-1 py-4 text-fucsia">#</th>
                        <th className="px-6 xs:px-1 sm:px-1 py-4">Name</th>
                        <th className="px-6 xs:px-1 sm:px-1 py-4">Postcode</th>
                    </tr>
                    {suburbs.length > 0 && 
                        suburbs.map((suburb, index) => {
                            return (
                                <SuburbRow
                                    index={index}
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