import React from 'react'
import Property from './Property'

export default function ShowProperties({filter, search}) {
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
