import Suburb from "../../models/suburb"
import { deleteSuburb } from "../../services/suburbs";
import { toast } from 'react-toastify';

type Props = {
    suburb : Suburb,
    setAdded(added: number): void, 
    added: number,
    index: number,
}
export default function SuburbRow({ suburb, setAdded, added, index }: Props) {
    const { name, postcode, id } = suburb;

    const handleRemove = async () => {
        try {
            await deleteSuburb(id)
            setAdded(added + 1);
        } catch (e: any) {
            console.log(e.message)
        }
        toast.success(`You have succesfully deleted the suburb: ${name}`);
    }

    return (
        <tr className="w-2/5 sm:w-full sm:text-sm xs:text-sm text-xl border-b border-grey">
            <td className="px-6 xs:px-1 sm:px-1 py-4 text-fucsia font-bold ">{index + 1}</td>
            <td className="px-6 xs:px-1 sm:px-1 py-4">{name}</td>
            <td className="px-6 xs:px-1 sm:px-1 py-4 text">{postcode}</td>
            <td>
                <input
                    className="bg-grey p-2 text-white text-xs rounded-sm tracking-[.10em] hover:bg-fucsia cursor-pointer"
                    type="button" 
                    onClick={handleRemove}
                    value="Remove"
                />
            </td>
        </tr>
    )
}