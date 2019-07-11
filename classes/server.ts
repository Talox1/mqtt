import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io'
import * as socket from '../sockets/socket';
import http from 'http';
import { Http2Server } from 'http2';

export default class Server {
   private static _instance: Server;

   public app: express.Application;
   public port: number;
   public io:socketIO.Server;//io va actuar como un servicio de socket
   private httpServer: Http2Server;


   private constructor(){
      this.app = express();
      this.port = SERVER_PORT;

      this.httpServer = new http.Server(this.app);
      this.io = socketIO(this.httpServer);
   }
   
   public static get instance(){
      return this._instance || (this._instance = new this())
   }

   private escucharSockets(){
      console.log('Escuchando Conexion');
      this.io.on('connection', cliente =>{
         console.log('Cliente conectado');
         
         //metodo de mensajes
         socket.mensaje(cliente, this.io);

         //metodo de desconectar
         socket.desconectar(cliente);
      });
   }

   start(callback:Function){
      this.httpServer.listen(this.port, callback());
   }
}