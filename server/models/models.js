const sequalize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequalize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequalize.define('basket',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketDevice = sequalize.define('basket_device',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Device = sequalize.define('device',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequalize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequalize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false}
})

const Rating = sequalize.define('rating',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

const DeviceInfo = sequalize.define('device_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

// свзязующая таблица для связи многие ко многим
const TypeBrand = sequalize.define('type_brand',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})

User.hasOne(Basket) // Связь между пользователем и корзиной 1 to 1
Basket.belongsTo(User) // корзина принадлежит пользователю

User.hasMany(Rating) // Связь 1 to Many
Rating.belongsTo(User) // рэйтинг принадлежит пользователю

Basket.hasMany(BasketDevice) // Связь 1 to Many
BasketDevice.belongsTo(Basket) // BasketDevice принадлежит Basket

Type.hasMany(Device) // Связь 1 to Many
Device.belongsTo(Type)

Brand.hasMany(Device) // Связь 1 to Many
Device.belongsTo(Brand)

Device.hasMany(Rating) // Связь 1 to Many
Rating.belongsTo(Device)

Device.hasMany(BasketDevice) // Связь 1 to Many
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo) // Связь 1 to Many
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand,{through: TypeBrand}) // Связь Many to Many
Brand.belongsToMany(Type, {through: TypeBrand}) // при данной связи создается промежуточная таблица TypeBrand где хранится информация:
                                                        //  1. Какой Brand принадлежит какому Type 2. Какой Type связан с каким Brand
//
module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}