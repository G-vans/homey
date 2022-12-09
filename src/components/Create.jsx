import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Create.css'

export default function Create() {

    // states
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    // eslint-disable-next-line no-unused-vars
    const [id, setId] = useState(params.id)


    // Form inputs
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        size: 1,
        image_url: ""
    })

    // handling input change 
    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    // fetching data while editing
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/properties/${id}`)
                .then(resp => resp.json())
                .then((item) => {
                    setFormData(item);
                })
        }
    }, [id]);

    function handleFormSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/properties${id ? '/' + id : ''}`, {
            method: id ? "PATCH" : "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((property) => console.log(property));
                    navigate(`/properties`)
                } else {
                    res.json().then((errorData) => setErrors(errorData.errors));
                }
            })
    }


    return (
        <div className='Properties'>
            <h1>{id ? "Edit Property" : "Add Property"}</h1>
            <form onSubmit={handleFormSubmit}>
                <label for="fname">Title</label>
                <input type="text" id="fname" name='title' onChange={handleInputChange} value={formData.title} placeholder="Enter Building name" />

                <label for="fname">Price</label>
                <input type="text" id="fname" name='price' onChange={handleInputChange} value={formData.price} placeholder="Enter price or value of the property" />

                <label for="lname">Image</label>
                <input type="text" id="lname" name='image_url' onChange={handleInputChange} value={formData.image_url} placeholder="Enter image url" />


                <label for="subject">Description</label>
                <textarea id="subject" name='description' onChange={handleInputChange} value={formData.description} placeholder="Add description, explaining the development"></textarea>

                <div className="errors">
                    {errors.length > 0 && (
                        <div style={{ color: "red" }}>
                            {errors.map((error) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
                <input type="submit" value={id ? "Update Property" : "Add Property"}></input>
            </form >
        </div>
    )
}
