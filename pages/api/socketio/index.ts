// Libs
import { Server, Socket } from 'socket.io';

// Constants
import {
  SOCKET_USER_ENTER,
  SOCKET_UPDATE_USERS_LIST,
  SOCKET_POST_MESSAGE,
  SOCKET_UPDATE_MESSAGES,
  SOCKET_UPDATE_TIMER,
  SOCKET_POST_LAUGHT,
} from './constants';

// Types
import { User, Message } from '../../../interfaces';

const ioHandler = (req: any, res: any) => {
  let usersConnected: User[] = [];
  let messages: Message[] = [];
  let moveIndex = 0;
  let timeLeft = 60;

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on('connection', (socket: Socket) => {
      socket.on(SOCKET_USER_ENTER, (user: User) => {
        const newUser = {
          ...user,
          _id: socket.id,
          scores: 0,
          isMoving: false,
        };

        usersConnected = [
          ...usersConnected,
          newUser,
        ];

        if (usersConnected[moveIndex]?._id === socket.id) {
          usersConnected[moveIndex].isMoving = true;
        }

        io.sockets.emit(SOCKET_UPDATE_USERS_LIST, usersConnected);
      });

      socket.on(SOCKET_POST_MESSAGE, (message: Message) => {
        messages.push(message);
        io.sockets.emit(SOCKET_UPDATE_MESSAGES, messages);
      });

      socket.on(SOCKET_POST_LAUGHT, () => {
        usersConnected = usersConnected.map((user) => ({
          ...user,
          scores: user._id === socket.id
            ? user.scores + 10
            : user.scores
        }));

        io.sockets.emit(SOCKET_UPDATE_USERS_LIST, usersConnected);
      });

      socket.on('disconnect', () => {
        usersConnected = usersConnected.filter((item) => item._id !== socket.id);
        io.sockets.emit(SOCKET_UPDATE_USERS_LIST, usersConnected);
      });

      setInterval(() => {
        timeLeft--;

        if (timeLeft) {
          io.sockets.emit(SOCKET_UPDATE_TIMER, timeLeft);
          return;
        }

        timeLeft = 60;
        moveIndex = usersConnected[moveIndex + 1]
          ? moveIndex + 1
          : 0;

        usersConnected = usersConnected.map((user, index) => ({
          ...user,
          isMoving: index === moveIndex,
        }));

        io.sockets.emit(SOCKET_UPDATE_TIMER, timeLeft);
        io.sockets.emit(SOCKET_UPDATE_USERS_LIST, usersConnected);
      }, 1000);
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

