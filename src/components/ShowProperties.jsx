import React from 'react'
import Property from './Property'

function ShowProperties ({filter, search}) {
    return (
        <div>
            <div className='properties-wrapper'>
                {search(filter).map((property) =>
                    <Property property={property} key={property.id} />
                )}
            </div>
        </div>
    )
}

export default ShowProperties;