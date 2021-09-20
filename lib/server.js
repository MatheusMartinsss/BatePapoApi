const server = require("http").createServer();
const { Users } = require('./utils/users');
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});
let users = new Users();
const PORT = 3333;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
io.on("connection", socket => {
    socket.on('Join', data => {
        const user = { id: socket.id, userID: data.userID, Name: data.Name, AvatarUrl: data.AvatarUrl };
        users.addUser(user);
        io.emit('UpdateUserList', users.getUsersList());
    });
    console.log('UserList', users.getUsersList());
    socket.on(NEW_CHAT_MESSAGE_EVENT, data => {
        console.log(data);
        io.emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        users.removeUser(socket.id);
        io.emit('UpdateUserList', users.getUsersList());
        socket.leave();
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});