import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import Filter from "./Filter"
import ShowProperties from "./ShowProperties"
import "../styles/Properties.css"

function Properties({ user }) {

    // states 
    const [properties, setProperties] = useState([]);
    const [filter, setFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3000/properties")
            .then((res) => res.json())
            .then((data) => {
                setProperties(data);
                setFilter(data);
                setIsLoading(false);
            });
    }, [isLoading]);
    // filter
    const filterProperties = (category) => {
        const updatedList = properties.filter(
            (property) => property.category.name === category
        );
        setFilter(updatedList);
    };

    const [query, setQuery] = useState("");

    const keys = ["title", "description"];

    // search function
    function search(data) {
        return data.filter((data) =>
            keys.some((key) => data[key].toLowerCase().includes(query.toLowerCase()))
        );
    }

    return (
        <div className='properties'>
            <Filter input={setQuery} setFilter={setFilter} filterProperties={filterProperties} properties={properties} />
            <div className='headers'>
                {user && user.role === 'admin' &&
                    <button onClick={() => { navigate('/addproperty') }} className='addbtn'>Add New Property</button>
                }
            </div>
            {isLoading ? <Loading /> : <ShowProperties search={search} filter={filter} />}
        </div>
    )
}

export default Properties;
