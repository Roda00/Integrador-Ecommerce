import { faArrowDown, faPen, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './admin-users.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { get, set, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useUser } from '../../Components/context/UserContext'

export default function Admin_Users({ sendRegister }) {

  const {token} = useUser()

  const URL = import.meta.env.VITE_API_URL

  const URL_UPLOAD = import.meta.env.VITE_FILES_URL

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  const [users, setUsers] = useState([])

  const [usuarioEditado, setUsuarioEditado] = useState(null)

  const password = watch("password")

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {

    getUsers()

  }, [])

  useEffect(() => {

    if (usuarioEditado) {


      setValue('nombrecompleto', usuarioEditado.nombrecompleto)
      setValue('email', usuarioEditado.email)
      setValue('pais', usuarioEditado.pais)
      setValue('date', usuarioEditado.date)

    }



  }, [usuarioEditado])


  function seleccionarUsuario(user) {

    setUsuarioEditado(user)

  }

  async function getUsers() {

    try {
      const response = await axios.get(`${URL}/users`, {
        headers: {
          access_token: token
        }
      }) 
      
      setUsers(response.data.users)

    } catch (error) {
      console.log(error)
    }

  }

  const onSubmit = async (data) => {


    const formData = new FormData();



    formData.append('nombrecompleto', data.nombrecompleto);
    formData.append('email', data.email);
    formData.append('date', data.date);
    formData.append('pais', data.pais);
    formData.append('password', data.password);

    if (data.image?.length) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append('image', data.image[i])
      }
    }

    try {
      if (usuarioEditado) {
        await editUser(usuarioEditado, formData);
        Swal.fire({
          icon: "success",
          title: "Usuario editado correctamente",
        });
      } else {
         await sendRegister(formData);
        Swal.fire({
          icon: "success",
          title: "Has sido registrado",
        });
      }

      await getUsers();
      reset();
      
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al procesar el formulario.",
      });
    }
  };


  function handleDeleteProduct(data) {

    Swal.fire({
      title: `¿Estas seguro de eliminar el usuario ${data.nombrecompleto} ?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, seguro"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado!",
          text: "El usuario a sido eliminado",
          icon: "success"
        });
        deleteProduct(data)
      }
    });

  }

  async function deleteProduct(data) {

    try {
      const response = await axios.delete(`${URL}/users/${data._id}`, {
        headers: {
          access_token: token
        }
      })

      getUsers()

    } catch (error) {
      console.log(error)
    }


  }
  async function editUser(data, formData) {

    try {
      const send = await axios.put(`${URL}/users/${data._id}`, formData, {
        headers: {
          access_token: token
        }
      })
  
      getUsers()
      setUsuarioEditado(null)

    } catch (error) {
      console.log(error)
    }

  }


  function pintarUsuarios() {

    return users.map((user) => {

      return (

        <tr key={user._id}>
          <td>
            {user.nombrecompleto}
          </td>
          <td>
            <img src={`${URL_UPLOAD}/users/${user.image[0]}`} alt="" />
          </td>
          <td>{user.email}</td>
          <td>{user.pais}</td>
          <td>{new Date(user.date).toLocaleDateString('es-AR')}</td>
          <td className="tools-cell">
            <button onClick={() => seleccionarUsuario(user)}>
              <FontAwesomeIcon icon={faPen} id="editar-icono" />
            </button>
            <button onClick={() => handleDeleteProduct(user)}>
              <FontAwesomeIcon icon={faTrash} id="borrar-icono" />
            </button>
          </td>
        </tr>

      )

    })
  }

  return (
    <main>
      <h1>Administrador de usuarios</h1>
      <div className="admin-users-cont">
        <table className="admin-users-table">
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Foto</th>
              <th>Email</th>
              <th>Pais</th>
              <th>Fecha de nacimiento</th>
              <th>Acciones</th>
            </tr>
          </tbody>
          <tbody>
            {pintarUsuarios()}
          </tbody>
        </table>
        <div className="admin-users-form-cont">
          <fieldset>
            <legend>Administrador de usuarios</legend>
            <form className='admin-users-form' action="" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="nombre">Nombre completo</label>
              <input
                {...register("nombrecompleto", { required: "Ingresa un nombre de usuario" })}
                maxLength={35}
                minLength={6}
                placeholder="Nombre Completo"
                type="text"
                id="nombre"
              />
              {errors.nombrecompleto && <p className='error'>{errors.nombrecompleto.message}</p>}

              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: "Ingresa un email" })}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                placeholder="Email"
                type="email"
                id="email"
              />
              {errors.nombrecompleto && <p className='error'>{errors.nombrecompleto.message}</p>}

              <label htmlFor="contraseña">Contraseña</label>
              <input
                {...register("password", {
                  required: "Ingresa tu contraseña",
                  minLength: { value: 4, message: "La contraseña debe tener 8 caracteres como minimo" }
                })}
                placeholder="Contraseña"
                type="password"
                id="contraseña"
              />
              {errors.password && <p className='error'>{errors.password.message}</p>}


              <label htmlFor="repetir-contraseña">Repetir contraseña</label>
              <input
                {...register("passwordConfirm", {
                  required: "Tienes que repetir la contraseña",
                  validate: (value) => value === password || "Las contrasenas no coinciden"
                })}
                placeholder="Repetir contraseña"
                type="password"
                id="repetir-contraseña"

              />
              {errors.passwordConfirm && <p className='error'>{errors.passwordConfirm.message}</p>}


              <label htmlFor="date">Fecha de nacimiento</label>
              <input
                {...register("date", { required: "Ingresa una fecha de nacimiento válida" })}
                max="2024-10-29"
                placeholder="Fecha de nacimiento"
                type="date"
                id="date"
              />
              {errors.date && <p className='error'>{errors.date.message}</p>}


              <label htmlFor="">Pais de nacimiento</label>
              <select id="pais" {...register("pais", { required: true })}>
                <option value="United States">United States</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antartica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo">Congo, the Democratic Republic of the</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                <option value="Croatia">Croatia (Hrvatska)</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="France Metropolitan">France, Metropolitan</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">
                  French Southern Territories
                </option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard and McDonald Islands">
                  Heard and Mc Donald Islands
                </option>
                <option value="Holy See">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran (Islamic Republic of)</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Democratic People's Republic of Korea">
                  Korea, Democratic People's Republic of
                </option>
                <option value="Korea">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia">Micronesia, Federated States of</option>
                <option value="Moldova">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">
                  Northern Mariana Islands
                </option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint LUCIA</option>
                <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia (Slovak Republic)</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia">
                  South Georgia and the South Sandwich Islands
                </option>
                <option value="Span">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="St. Helena">St. Helena</option>
                <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan, Province of China</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States Minor Outlying Islands">
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Viet Nam</option>
                <option value="Virgin Islands (British)">
                  Virgin Islands (British)
                </option>
                <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                <option value="Wallis and Futana Islands">
                  Wallis and Futuna Islands
                </option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Serbia">Serbia</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>

              <h3>Selecciona tu foto de perfil</h3>
              <label htmlFor="file-upload" className='custom-file-upload'><FontAwesomeIcon className='upload-icon' icon={faUpload} />Foto de perfil</label>
              <input
                {...register("image", { required: "Ingresa una imagen de perfil" })}
                type="file"
                accept='image/*'
                id="file-upload"

              />
              <input defaultValue={usuarioEditado ? "Editar ususario" : "Registrar"} id="submit" type="submit" />
            </form>
          </fieldset>
        </div>
      </div>
      <button className="scroll-btn" onClick={() => scrollToBottom()}>
        <FontAwesomeIcon icon={faArrowDown} id="scroll-icon" />
      </button>
    </main>
  )

}

