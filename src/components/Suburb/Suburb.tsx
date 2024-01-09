import Suburb from "../../models/suburb"

type Props = {
    suburb : Suburb,
}
export default function SuburbComponent({ suburb}: Props) {

    const { name, postcode } = suburb;
    return (
        <div>
            <div>
                <h4>Name:</h4>
                <p>{name}</p>
            </div>
            <div>
                <h4>Postcode:</h4>
                <p>{postcode}</p>
            </div>
        </div>
    )
}