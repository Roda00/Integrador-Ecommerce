import React from 'react'

export default function Pianos_list({ pianos }) {


    return (

        <div className="pianos-list">

            {pianos.map((piano) => (


                <Piano_product key={piano.id}
                    piano={piano}
                />
            ))}
        </div>
    );
}

