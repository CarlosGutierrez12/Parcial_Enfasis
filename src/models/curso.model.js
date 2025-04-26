const { DataTypes } =  require("sequelize");
const sequelize = require("../db/db");
//const Matricula = require("./matricula.model");

const Curso = sequelize.define(
    "Curso",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull: {msg:"El nombre es obligatorio"}
            }
        },
        descripcion:{
            type: DataTypes.STRING(300),
            allowNull: false,
            validate:{
                notNull: {msg:"La descripción es obligatoria"}
            }
        },
        duracion_horas:{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            validate:{
                notNull: {msg:"La duracion es obligatoria"}
            }
        }
    },
    {
        timestamps: true
    }
);

/* Curso.hasMany(Matricula,{
    foreignkey: "cursoId",
    sourcekey: "id"
});
 */
module.exports = Curso;