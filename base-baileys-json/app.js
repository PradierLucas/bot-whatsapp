const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

const flowPrecio = addKeyword(['precios', 'precio']).addAnswer(
    [
        '💰 Ingresa a este link para conocer nuestros precios y ofertas:',
        '🔗 https://preciosestacion.netlify.app/',
        '\n🔄 *Regresa al menú principal escribiendo "menú"*'
    ]
);

const flowHorario = addKeyword(['horarios', 'horario']).addAnswer(
    [
        '🕒 *Horarios de atención:*',
        '📅 Lunes a Sábados de 8:00 a 13:00 y de 17:00 a 21:00 hs',
        '📅 Domingos de 9:00 a 13:00 hs',
        '\n🔄 *Regresa al menú principal escribiendo "menú"*'
    ]
);

const flowGracias = addKeyword(['ubicacion', 'ubicación']).addAnswer(
    [
        '📍 *¡Visítanos!*',
        '🏠 *Sucursal 1*: Quaranta y Av 115',
        '🏠 *Sucursal 2*: Ruta 12 y 17 de Agosto',
        '\n🔄 *Regresa al menú principal escribiendo "menú"*'
    ]
);

const flowAgradecimiento = addKeyword(['gracias', 'grac', 'gracia']).addAnswer(
    [
        '🙏 ¡De nada! Estamos para ayudarte.',
        'Si necesitas algo más, no dudes en preguntar.',
        '\n🔄 *Regresa al menú principal escribiendo "menú"*'
    ]
);

const flowNoReconocido = addKeyword(['default']).addAnswer(
    [
        '🤔 Lo siento, no entendí tu mensaje.',
        'Por favor, escribe uno de los siguientes comandos:',
        '👉 *PRECIOS* para conocer nuestros precios y ofertas.',
        '👉 *HORARIOS* para ver los horarios de atención.',
        '👉 *UBICACION* para conocer nuestras sucursales.',
        '\n🔄 *Para regresar al menú en cualquier momento, escribe "menú".*',
        '🕐 *Si necesitas otra consulta, por favor espera un momento a ser atendido.*'
    ]
);

const flowPrincipal = addKeyword(['hola', 'buenas', 'buen', 'menu', 'menú']).addAnswer(
    '🙌 *Hola, bienvenido a Estación de Carnes*',
    null,
    null,
    [flowPrecio, flowGracias, flowHorario, flowAgradecimiento]
).addAnswer(
    [
        'Aquí tienes las opciones disponibles:',
        '👉 *PRECIOS* para conocer nuestros precios y ofertas.',
        '👉 *HORARIOS* para ver los horarios de atención.',
        '👉 *UBICACION* para conocer nuestras sucursales.',
        '\n🔄 *Para regresar a este menú en cualquier momento, escribe "menú".*'
    ]
);


const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowPrecio, flowGracias, flowHorario, flowAgradecimiento, flowNoReconocido])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()