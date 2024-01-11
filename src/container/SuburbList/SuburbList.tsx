import SuburbRow from "../../components/SuburbRow/SuburbRow"
import Suburb from "../../models/suburb"

type Props = {
    suburbs: Array<Suburb>,
}

export default function SuburbList({ suburbs }: Props) {

    return (
       <>
            <div>
                <h1>Suburb's List</h1>
            </div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Postcode</th>
                </tr>
                {suburbs.length > 0 && 
                    suburbs.map((suburb) => {
                        return (
                            <SuburbRow
                                suburb={suburb}
                                key={suburb.id}
                            />
                        );
                    })    
                }
            </table>
       </> 
    )
}