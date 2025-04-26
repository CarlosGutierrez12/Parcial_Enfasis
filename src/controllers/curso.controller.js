const Curso = require("../models/curso.model");
const response = require("../res/response");

const getAll = async(req, res, next)=>{
    try {    
        const cursos = await Curso.findAll();
        let data = "";
        if (cursos.length>0) {
            data = {
                total_registros: cursos.length,
                registros: cursos
            }
        } else {
            data = {
                message: "no hay registros en la tabla"
            }
        } 
        response.success(req,res,data,200);
    } catch (error) {
        next(error)
    }
};

const getOne = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const curso = await Curso.findOne({where:{id}})
        let data = "";
        if (curso) {
            data = {
                registro: curso
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
        await Curso.sync();
        const createdCurso = await Curso.create(data);
        let message;
        if (createdCurso.id) {
            message = {
                msg: "registro efectuado exitosamente",
                regId: createdCurso.id
            }
        } else {
            message = {
                msg: "error, usuario no creado"
            }
        }
        response.success(req,res,message,201);
    } catch (error) {
        next(error);
    }
};

const update = async(req,res,next)=>{
    try {
        const data = req.body;
        const id = req.params.id
        const updatedCurso = await Curso.update(data,{ where: {id}});
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
        const deleteCurso = await Curso.destroy({where:{id}})
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