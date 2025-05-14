import React from 'react';
import './UserProfile.css';
import { useUser } from '../../Components/context/UserContext';
import { useForm } from 'react-hook-form';

export default function UserProfile({createUser}) {

    const { handleSubmit, register } = useForm();

    const { login, user } = useUser()



    const onSubmit = (data) => {

        const formData = new FormData()

        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
        }

        createUser
    }

    return (



        <div className="profile-cont">
            <h1>Perfil de usuario</h1>
            <div className='user-profile'>
                <div className="user-data-cont">
                    <div className="user-image">
                        <h2>Imagen de perfil</h2>
                        <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                        <div className="form-image">
                            <form action="" onSubmit={handleSubmit(onSubmit)}>

                                <input {...register('image')}
                                    type='file'
                                    accept='image/*'
                                />
                                <button type='submit'>Subir imagen</button>
                            </form>
                        </div>
                    </div>
                    <div className="user-data">
                        <h2>Datos del usuario</h2>
                        <p>{`Nombre: ${user.nombrecompleto}`}</p>
                        <p>{`Email: ${user.email}`}</p>
                        <p>{`Pais: ${user.pais}`} </p>
                    </div>
                </div>
                <div className="user-orders">
                    <h2>Ordenes realizadas</h2>
                </div>
            </div>

        </div>
    );


}