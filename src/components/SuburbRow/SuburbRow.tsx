import Suburb from "../../models/suburb"
import { deleteSuburb } from "../../services/suburbs";

type Props = {
    suburb : Suburb,
    setAdded(added: number): void, 
    added: number,
}
export default function SuburbRow({ suburb, setAdded, added }: Props) {
    const { name, postcode, id } = suburb;

    const handleRemove = async () => {
        try {
            await deleteSuburb(id)
            setAdded(added + 1);
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <tr className="w-2/5 text-xl border-b border-grey">
            <td className="px-6 py-4 text-fucsia font-bold ">{id}</td>
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4 text">{postcode}</td>
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