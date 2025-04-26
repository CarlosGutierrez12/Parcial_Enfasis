const Estudiante = require("../models/estudiante.model");
const Curso = require("../models/curso.model");
const Matricula = require("../models/matricula.model");
const response = require("../res/response");

const getAll = async(req, res, next)=>{
    try {    
        
        const matricula = await Matricula.findAll({
            include: [
                { model: Estudiante, as: "Estudiante" },
                { model: Curso, as: "Curso" } // Adding the "Curso" model
            ]
        });

        let data = "";
        if (matricula.length>0) {
            data = {
                total_registros: matricula.length,
                registros: matricula
            }
        } else {
            data = {
                message: "no hay registros en la tabla"
            }
        } 
        response.success(req,res,data,200);
    } catch (error) {
        response.error(req,res,error.message,500);
    }
};

const getOne = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const matricula = await Matricula.findOne({where:{id},
            include : { model: Estudiante, as: "Estudiante"},
            include : { model: Curso, as: "Curso"}
        });
        let data = "";
        if (matricula) {
            data = {
                registro: matricula
            }
        } else {
            data = {
                message: "no hay registro con ese id"
            }
        } 
        response.success(req,res,data,200);
    } catch (error) {
        next(error)
    }
};

const create = async(req,res,next)=>{
    try {
        const data = req.body;
        await Matricula.sync();
        const createdMatricula = await Matricula.create(data);
        let message;
        if (createdMatricula.id) {
            message = {
                msg: "registro efectuado exitosamente",
                regId: createdMatricula.id
            }
        } else {
            message = {
                msg: "error, usuario no creado"
            }
        }
        response.success(req,res,message,201);
    } catch (error) {
        response.error(req,res,error,500);
    }
};

const update = async(req,res,next)=>{
    try {
        const data = req.body;
        const id = req.params.id
        const updatedMatricula = await Matricula.update(data,{ where: {id}});
        message = {
            msg: "registro actualizado exitosamente",
            regId: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error);
    }
};

const deleted = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const deleteMatricula = await Matricula.destroy({where:{id}})
        let message = {
            msg: "Registro eliminado exitosamente",
            regId: id
        }
        response.success(req,res,message,200);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleted
}