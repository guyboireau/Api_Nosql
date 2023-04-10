const {createClient} = require('redis');
const PREFIX = 'articles';
const keys = [];

// articles:/article
const TIMEOUT = 60 * 30; // 30 min 

const cache = async (request, response, next) =>{
    const client = createClient();
    client.on('error', (err) => console.log(err));
    await client.connect();

    // construction de la clé des infos à insérer 
    const key = `${PREFIX}:${request.url}`
    // récupérer les éléments dans redis si ils y sont
    if(keys.includes(key)){
        const json = await client.get(key);

        const value = JSON.parse(json);

        response.json(value);
    } else {
        // sauvegarde de la méthode json()
        const originalJson = response.json.bind(response);

        // redefinition de la méthode json pour inclure les data dans redis 
        response.json = async data => {
            const jsondata = JSON.stringify(data);
            await client.set(key, jsondata);
            await client.expire(key, TIMEOUT);
            keys.push(key);
            console.log('version mise en cache')
            originalJson(data)
        }
        next()
    }
}

const flush = async (request, response, next) => {
    const client = createClient();
    client.on('error', (err) => console.log(err));
    await client.connect();

    // vider les clés du tableau keys 
    for(const key of keys) {
        console.log('removing key', key);
        await client.del(key)
    }

    keys.length = 0;

    next()
}

module.exports = {
    cache,
    flush
}