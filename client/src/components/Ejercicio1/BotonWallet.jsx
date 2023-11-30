// Importamos librerías a utilizar
import Web3 from 'web3'
import { useState } from 'react'

// Creo el componente BotonWallet
export default function BotonWallet() {

    // Definimos las variables de estado para gestionar acciones en los componentes
    const [cuenta, setCuenta] = useState(null) // La iniciamos con null
    const [balance, setBalance] = useState(null) // La iniciamos con null
    
    // Lógica para conectar y desconectar la cuenta de Metamask
    const handleClickConnectWallet = async () => {
        
        // Lógica si hay conexión
        try {
            // Codigo asincrono a ejecutar
            if (window.ethereum) {
                // Codigo a ejecutar si la Billetera está instalada

                console.log('Billetera instalada') // Mensaje en la consola

                // Declaro la instancia de web3 y le paso la extensión de nuestro proveedor (window.ethereum)
                const web3 = new Web3(window.ethereum)
                // La habilito
                await window.ethereum.enable()

                // Obtener las cuentas del Billetero 
                const cuentas = await web3.eth.getAccounts()
                // Lógica en función de lo que devuelva en cuentas
                if (cuentas.length > 0) { // Si tenemos alguna cuenta (algún elemento)
                    setCuenta(cuentas[0]) // Actualizo el estado con la 1a cuenta y puedo utilizar el valor de cuenta
                    console.log('Cuentas: ', cuentas) // Muestro la cuenta en la consola
                } else {
                    throw new Error('No se ha encontrado ninguna cuenta en el Billetero')
                }

                // Recupero el balance (saldo) de la cuenta en WEIs
                const balance = await web3.eth.getBalance(cuentas[0])

                // Lo muestro en la consola
                console.log('Balance: ', balance, 'wei')
                
                // Lo convierto en ETH
                const balanceEth = web3.utils.fromWei(balance, 'ether')
                setBalance(balanceEth)
                console.log('Balance: ', balanceEth, 'ether')

            } else {
                throw new Error('No se encontró una Billetera Ethereum es este navegador')
            }
        
        } catch (error) {
            // Codigo a ejecutar si hay un error
            console.log('Error al conectar la Billetera', error)
        }
    
    }

    // Para desconectar la Billetera, aunque Metamask sigue en segundo plano las variables de estado
    const handleClickDesconectarWallet = () => {
        setCuenta(null) // Devuelve los estados a su valor null inicial
        setBalance(null) // Devuelve los estados a su valor null inicial
    }

    // Función para ocultar la dirección entera de la cuenta
    function ocultarDireccionCuenta(direccionCuenta) {
        if (cuenta) {
            const inicioDireccion = direccionCuenta.slice(0,8)
            const finalDireccion = direccionCuenta.slice(-8)
            const direccionOculta = `${inicioDireccion}...${finalDireccion}`

            return direccionOculta
        
        } else {
            return direccionCuenta
        }
    }

    return (
        <div>
            {cuenta? (  // Operador ternario: si se cumple quiere decir que estamos conectados y que tengo cuenta
                <>
                    <p>Conectado a la Billetera: {ocultarDireccionCuenta(cuenta)}</p>
                    <p>Balance: {balance} ether</p>
                    <button onClick={handleClickDesconectarWallet}>Desconectar</button> {/*Al pulsarlo cuenta sera null e iremos al boton de Conectar */}
                </>    
                ) : (
                    <button onClick={handleClickConnectWallet}>Conectar</button>
                )
            }
        </div>
    )
}