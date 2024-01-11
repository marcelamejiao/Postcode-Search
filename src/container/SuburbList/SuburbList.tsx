import SuburbRow from "../../components/SuburbRow/SuburbRow"
import Suburb from "../../models/suburb"

type Props = {
    suburbs: Array<Suburb>,
}

export default function SuburbList({ suburbs }: Props) {

    return (
       <div className="m-0 flex flex-col items-center w-full ">
            <div className="w-3/5">
                <h1 className="text-white text-5xl text-center tracking-[.05em] mt-4 font-bold">Suburb's List</h1>
            </div>
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
                                />
                            );
                        })    
                    }
                </table>
            </div>
       </div> 
    )
}