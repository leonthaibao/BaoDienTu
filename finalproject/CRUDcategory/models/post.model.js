var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from posts');
    },
    single: id=>{
        return db.load(`select * from posts where postID = ${id}`);
    },
    add: (entity)=>{
        return db.add('posts',entity);
    },
    update: (entity)=>{
        return db.update('posts','postID',entity);
    },
    delete: (id)=>{
        return db.delete('posts','postID',id);
    },
    pageByCat: ( limit, offset) => {
        return db.load(`select * from posts limit ${limit} offset ${offset}`);
    },
    
    countByCat: () => {
        return db.load(`select count(*) as total from posts`);
    },
}