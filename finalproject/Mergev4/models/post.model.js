var db= require('../utils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from post');
    },
    single: id=>{
        return db.load(`select * from post where postID = ${id}`);
    },
    add: (entity)=>{
        return db.add('post',entity);
    },
    update: (entity)=>{
        return db.update('post','postID',entity);
    },
    delete: (id)=>{
        return db.delete('post','postID',id);
    },
    loadtwotable: () =>{
        return db.load2table(`SELECT c.cateID, c.cateName FROM category c ;SELECT t.tagID, t.tagName FROM tags t `)
    },
    listCDDLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='CDD' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
    singleLoad: (postid)=>{
        return db.load(`SELECT *,date_format(postNgayDang,'%d-%m-%Y') as ngaydang FROM post p, category c, tags t where  p.postID=${postid}  and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`);
    },
    listDDDLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='DDD' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
   
    listDXBLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='DXB' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
  
    listBTCLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='BTC' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
  
    loadthreetable:(postid,writerid)=>{
        return db.load3table(`SELECT c.cateID, c.cateName FROM category c ;SELECT t.tagID, t.tagName FROM tags t ; SELECT * FROM post p, category c, tags t where  p.postID=${postid}  and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
    listChuaDuocDuyetLoad: (editorid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='CDD'  and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID and p.postChuyenMucID in (select userCateID from adminuser where userID = ${editorid})`)
    },
    loadthreetable:(postid)=>{
        return db.load3table(`SELECT c.cateID, c.cateName FROM category c ;SELECT t.tagID, t.tagName FROM tags t ; SELECT * FROM post p, category c, tags t where  p.postID=${postid}  and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
    listDaPheDuyet: (editorid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where (p.postTrangThaiID='BTC' or p.postTrangThaiID='DDD')  and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID and p.postChuyenMucID in (select userCateID from adminuser where userID = ${editorid})`)
    },
    pageByCat: ( limit, offset) => {
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID!='DXB' and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID limit ${limit} offset ${offset}`);
    },
    
    countByCat: () => {
        return db.load(`select count(*) as total from post p where p.postTrangThaiID!='DXB'`);
    },
    pageByDXBPost: ( limit, offset) => {
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='DXB' and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID limit ${limit} offset ${offset}`);
    },
    countByDXBPost: () => {
        return db.load(`select count(*) as total from post p where p.postTrangThaiID='DXB'`);
    },
    loadTop3Post:() => {
        return db.load(`select * from post order by postLuotView DESC limit 3`);
    },
    loadPostFourTable:()=>{
        return db.load5table(`SELECT * FROM tags,post WHERE post.postTagID = tags.tagID ORDER BY post.postLuotView DESC limit 3;select * from tags,post WHERE post.postTagID = tags.tagID ORDER BY post.postLuotView DESC limit 10;select * from tags,post WHERE post.postTagID = tags.tagID ORDER BY post.postNgayDang DESC limit 10 ;SELECT * FROM tags;SELECT * FROM category`)
    },
    loadSearch:(name) => {
        return db.load(`SELECT *, MATCH (post.postTieuDe,post.postTomTat,post.postNoiDung) against ('${name}') as score FROM post,category,tags WHERE post.postTagID=tags.tagID and post.postChuyenMucID=category.cateID ORDER BY score desc limit 5`)
    }
}