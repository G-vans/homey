import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Property({ property }) {
  const navigate = useNavigate()
  return (
    <div className='property-container' onClick={() => { navigate(`/properties/${property.id}`); }}>
      <div className='property'>
        <div className='image'>
          <img src={property.image_url} alt='' />
        </div>
        <div className='details'>
          <h3>{property.title}</h3>
          <p>{property.description.substring(0,53)}...</p>
          <h4>Kshs. {property.price}</h4>
        </div>
      </div>
    </div>
  )
}
