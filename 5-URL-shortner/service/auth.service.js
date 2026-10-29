// const sessionIDToUserMap = new Map();

// function setUser(id , user){
//     sessionIDToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIDToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser
// }

const sessionIDToUserMap = new Map();

function setUser(id, user) {
    console.log("SET ID:", id);
    console.log("SET ID TYPE:", typeof id);

    sessionIDToUserMap.set(id, user);
    console.log("MAP HAS ID:", sessionIDToUserMap.has(id));
    console.log("MAP SIZE AFTER SET:", sessionIDToUserMap.size);
}

function getUser(id) {
    console.log("GET ID:", id);
    console.log("GET ID TYPE:", typeof id);

    console.log("MAP SIZE DURING GET:", sessionIDToUserMap.size);
    console.log("MAP HAS ID:", sessionIDToUserMap.has(id));

    return sessionIDToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
};