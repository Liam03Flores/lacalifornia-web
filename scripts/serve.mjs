import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.avif':'image/avif'};
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  const decoded=decodeURIComponent(url.pathname);
  let file=path.resolve(root,'.'+decoded);
  const relative=path.relative(root,file);
  if(relative.startsWith('..')||path.isAbsolute(relative)||['archivo-inicial','scripts','qa','.git','.codex','.agents'].some(p=>relative.split(path.sep)[0]===p)){res.writeHead(403);res.end('Acceso no permitido');return;}
  if((await stat(file).catch(()=>null))?.isDirectory()){
   if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});res.end();return;}
   file=path.join(file,'index.html');
  }
  const data=await readFile(file).catch(()=>null);
  if(!data){res.writeHead(404,{'Content-Type':mime['.html']});res.end(await readFile(path.join(root,'404.html')));return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(400);res.end('Solicitud no válida');}
}).listen(port,'127.0.0.1',()=>console.log('Vista local: http://127.0.0.1:'+port));
