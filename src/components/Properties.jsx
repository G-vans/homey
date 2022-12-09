import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "./Loading"

import ShowProperties from "./ShowProperties"
import "../styles/Properties.css"


export default function Properties({ user }) {

    // states 
    const [properties, setProperties] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // navigation
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3000/properties")
            .then((res) => res.json())
            .then((data) => {
                setProperties(data);
                setIsLoading(false);
            });
    }, [isLoading]);

    // filter products based on categories
    

    // search state
    const [query, setQuery] = useState("");

    // search fields
    const keys = ["title", "description"];

    // search function
    function search(data) {
        return data.filter((data) =>
            keys.some((key) => data[key].toLowerCase().includes(query.toLowerCase()))
        );
    }

    return (
        <div className='properties'>
            
            <div className='headers'>
                {user && user.role === 'admin' &&
                    <button onClick={() => { navigate('/addproperty') }} className='addbtn'>Add New Property</button>
                }
            </div>
            {isLoading ? <Loading /> : <ShowProperties search={search}  />}
        </div>
    )
}
