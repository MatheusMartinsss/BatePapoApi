class Users {
    constructor() {
        this.users = [];
    }
    addUser(data) {
        console.log('userADD', data);
        this.users.push(data);
        return data;
    }
    getUsersList() {
        let users = this.users.map(item => item);
        return users;
    }
    removeUser(id) {
        this.users = this.users.filter(item => item.id !== id);
        return this.users;
    }
}
module.exports = { Users };