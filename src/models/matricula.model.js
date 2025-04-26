const { DataTypes } =  require("sequelize");
const sequelize = require("../db/db");

const Matricula = sequelize.define(
    "Matricula",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        estudianteId:{
            type: DataTypes.UUID,
            allowNull: false,
            validate:{
                notNull: {msg:"El id del estudiante es obligatorio"}
            }
        },
        cursoId:{
            type: DataTypes.UUID,
            allowNull: false,
            validate:{
                notNull: {msg:"El id del curso es obligatorio"}
            }
        },
        fecha_matricula:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                notNull: {msg:"La fecha de matricula es obligatoria"}
            }
        }
    },
    {
        timestamps: true
    }
);


module.exports = Matricula;