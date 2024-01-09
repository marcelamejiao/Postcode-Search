import SuburbComponent from "../../components/Suburb/Suburb"
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
            <div>
                {suburbs.length > 0 && 
                    suburbs.map((suburb) => {
                        return (
                            <SuburbComponent
                                suburb={suburb}
                                key={suburb.id}
                            />
                        );
                    })    
                }
            </div>
       </> 
    )
}