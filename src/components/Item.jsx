import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import "../styles/Item.css"
import Loading from './Loading'
import Review from './Review'


export default function Item({ addToCart, user }) {

    const { id } = useParams()
    const [property, setProperty] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)

    const navigate = useNavigate()


    function handleAddToCart(item) {
        addToCart(item)
    }

    const fetchProperty = async () => {
        fetch(`http://localhost:3000/properties/${id}`)
            .then((res) => res.json())
            .then((item) => {
                setLoading(false)
                setProperty(item)
            })
    }
    useEffect(() => {
        fetchProperty()
    }, [reload])

    function handleDelete(property) {
        fetch(`http://localhost:3000/properties/${property.id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
    }


    const ShowProperty = () => {
        return (
            <div className='PropertyDetail'>
                <h1 className='pagetitle'>Property Details</h1>
                <div className='Item' >
                    <div className='propertyImage'>
                        <img src={property.image_url} alt="" />
                    </div>
                    <div className='Description'>
                        <h1>{property.title}</h1>
                        <h2>Category: {property.category.name}</h2>
                        <h2>Kshs. {property.price}</h2>
                        <p>{property.description}</p>
                    </div>
                </div>
                {user !== null && user.role === 'admin' &&
                    <div className='update-delete'>
                        <button className='button button1'><a href={`edit/${property.id}`}>Edit Property</a></button>
                        <button className='button button2' onClick={() => { handleDelete(property); navigate(`/property`) }}>Delete Property</button>
                    </div>
                }
                <div className="reviews">
                    <h2>Reviews</h2>
                    <hr style={{ marginBottom: ".5em" }} />
                    {property.reviews.length === 0 &&
                        <div className="review-items" style={{textAlign:"center"}}>
                            <h2 >There are no reviews for this development.</h2>
                            <p>Be the first to review.</p>
                        </div>
                    }
                    {property.reviews.length > 0 &&
                        <div className='review-items'>
                            {property.reviews.map((review) =>
                                <div key={review.id} className='comment'>
                                    <p className='username'>{review.user.username}: </p> <p> {review.comment}</p>
                                </div>
                            )}
                        </div>
                    }
                    {user === null && 
                        <p style={{color:"blue"}}>Please login to the system to review this property.</p>
                    }

                    {user !== null &&
                        <Review user={user} property={property} setReload={setReload} />
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            {loading ? <Loading /> : <ShowProperty />}
        </div>
    )
}
