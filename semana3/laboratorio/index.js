
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const stream = require('stream')

/* READABLE */
const readable = fs.createReadStream('datos.txt', {encoding: 'utf8' })
// readable.on('data', chunk => console.log('Fragmento recibido: ', chunk))
// readable.on('end', () => console.log('Lectura completada'))
// readable.on('error', err => console.error('Error: ', err))

/* WRITEABLE */
const writable = fs.createWriteStream('salida.txt')
// writable.write('Este es un mensaje de prueba \n' )
// writable.end('Fin del mensaje.')
// writable.on('finish', () => console.log('Escritura completada'))

/* PIPES */
// const readStream = fs.createReadStream('entrada.txt')
// const writeStream = fs.createWriteStream('entrada.txt.gz')
// const gzip = zlib.createGzip()
// readStream.pipe(gzip).pipe(writeStream)


/* MANEJO DE ERRORES Y BACKPRESSURE */
readable.on('data', chunk => {
    if(!writable.write(chunk)){
        console.log('Pasuse')
        readable.pause()
    }
})
writable.on('drain', () => {
    console.log('Resume')
    readable.resume()
}) 