import pg from 'pg';

const { Client} = pg;
const cliente = new Client();
await cliente.connect();

try {
    const res = await cliente.query("select  $1::text as message", ["Hello world!"]);
    console.log(res.rows[0].message); // Hello world!
} catch (err){
    console.log("Erro ao aguardar resposta: "+err);   
} finally {
    await cliente.end();
}

export default cliente;