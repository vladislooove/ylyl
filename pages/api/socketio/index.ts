// Libs
import { Server, Socket } from 'socket.io';

// Constants
import { SOCKET_USER_ENTER, SOCKET_UPDATE_USERS_LIST, SOCKET_USER_EXIT } from './constants';

// Types
import { User } from '../../../interfaces';

const ioHandler = (req: any, res: any) => {
  let usersConnected: User[] = [];

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on('connection', (socket: Socket) => {
      socket.on(SOCKET_USER_ENTER, (user: User) => {
        usersConnected.push(user);
        socket.emit(SOCKET_UPDATE_USERS_LIST, usersConnected);
      });

      socket.on(SOCKET_USER_EXIT, (id: string) => {
        usersConnected = usersConnected.filter((item) => item.id !== id);
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

