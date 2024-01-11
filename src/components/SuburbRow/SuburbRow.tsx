import Suburb from "../../models/suburb"

type Props = {
    suburb : Suburb,
}
export default function SuburbRow({ suburb}: Props) {
    const { name, postcode, id } = suburb;

    return (
        <tr className="w-2/5 text-xl border-b border-grey">
            <td className="px-6 py-4 text-fucsia font-bold ">{id}</td>
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4 text">{postcode}</td>
        </tr>
    )
}