import { useState } from "react";
import Swal from 'sweetalert2';
import UserService from "../../services/UserService";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await UserService.authUser(username, password);

            // Verifica si la respuesta contiene un token de autenticación
            if (response.data.token) {
                // Aquí puedes almacenar el token en el almacenamiento local o en una cookie
                console.log('Token de autenticación:', response.data.token);
                Swal.fire({
                    icon: 'success',
                    title: '¡Inicio de sesión exitoso!',
                    text: '¡Bienvenido!',
                    confirmButtonText: 'Ok'
                });
            } else {
                // Si la respuesta no contiene un token, muestra un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el inicio de sesión',
                    text: 'Por favor, verifica tu nombre de usuario y contraseña',
                    confirmButtonText: 'Ok'
                });
            }
        } catch (error) {
            console.error('Error en el login:', error);
            // Muestra un mensaje de error genérico en caso de error de red u otro error
            Swal.fire({
                icon: 'error',
                title: 'Error en el inicio de sesión',
                text: 'Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Ok'
            });
        }
    };


  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">Iniciar Sesión</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={username} onChange={handleUsernameChange} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Recordarme</label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-slate-700 hover:text-indigo-500">
                                Ovidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>

  )
}
export default Login;
