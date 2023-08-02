const { Model, DataTypes } = require('sequelize');
const db = require('./db')
class Ebooks extends Model{
    static setStorage(val){
        this.storage = val
        this.save()
    }
    static async addBook(body){
        try {
            await db.sync();
            const ebook = await Ebooks.create(body)
            console.log('创建成功！')
            return ebook
        } catch (error) {
            console.error('创建失败',error);
        }
    }
}
Ebooks.init({
    id: {type: DataTypes.INTEGER({unsigned: true}),primaryKey:true, autoIncrement: true, comment: '书籍Id'},
    name: {
        type: DataTypes.STRING(200),
        comment: '书名',
    },
    coverUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '封面',
    },    
    format: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: '格式',
    },  
    year: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '年份，出版社',
    },            
    author: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '年份，出版社',
    },  
    desc: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '简介'
    },
    isbns: {
        type: DataTypes.JSON,
        allowNull:true,
        comment: '编码'
    },
    links: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: '下载链接'
    },
    storage: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: '文件存储位置'
    }          
},{
    sequelize: db,
    tableName: 'ebooks',
    modelName: 'ebooks'
})

module.exports = Ebooks