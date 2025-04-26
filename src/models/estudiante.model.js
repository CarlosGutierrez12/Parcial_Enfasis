const { DataTypes } =  require("sequelize");
const sequelize = require("../db/db");

const Estudiante = sequelize.define(
    "Estudiante",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                notNull: {msg:"El nombre es obligatorio"}
            }
        },
        apellido:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                notNull: {msg:"El Apellido es obligatorio"}
            }
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
                notNull: {msg:"El correo electronico invalido"}
            }
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                notNull: {msg:"Fecha de nacimiento es obligatoria"}
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = Estudiante;