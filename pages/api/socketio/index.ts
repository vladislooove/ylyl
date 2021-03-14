// Libs
import { Server, Socket } from 'socket.io';

// Constants
import { SOCKET_USER_ENTER, SOCKET_UPDATE_USERS_LIST } from './constants';

// Types
import { User } from '../../../interfaces';

const ioHandler = (req: any, res: any) => {
  let usersConnected: User[] = [];
  let turnIndex = 0;

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on('connection', (socket: Socket) => {
      socket.on(SOCKET_USER_ENTER, (user: User) => {
        usersConnected.push({
          ...user,
          _id: socket.id,
        });
        io.sockets.emit(SOCKET_UPDATE_USERS_LIST, usersConnected);
      });

      socket.on('disconnect', () => {
        usersConnected = usersConnected.filter((item) => item._id !== socket.id);
        io.sockets.emit(SOCKET_UPDATE_USERS_LIST, usersConnected);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default ioHandler;

