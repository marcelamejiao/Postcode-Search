import Suburb from "../../models/suburb"

type Props = {
    suburb : Suburb,
}
export default function SuburbRow({ suburb}: Props) {
    const { name, postcode } = suburb;

    return (
        <tr>
            <td>{name}</td>
            <td>{postcode}</td>
        </tr>
    )
}