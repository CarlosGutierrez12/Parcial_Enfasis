const Estudiante = require("../models/estudiante.model");
const Matricula = require("../models/matricula.model");
const Curso = require("../models/curso.model");
const response = require("../res/response");

const getAll = async(req, res, next)=>{
    try {    
        const estudiante = await Estudiante.findAll({
        });
        let data = "";
        if (estudiante.length>0) {
            data = { 
                total_registros: estudiante.length,
                registros: estudiante
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
        const estudiante = await Estudiante.findOne({where:{id},
        },)
        let data = "";
        if (estudiante) {
            data = {
                registro: estudiante
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

const getCursos = async (req, res, next) => {
    try {
      const id = req.params.id;
      const matriculas = await Matricula.findAll({
        where: { estudianteId: id },
        include: [{
          model: Curso,
          attributes: ['nombre']
        }]
      });
  
      if (matriculas && matriculas.length > 0) {
        const cursos = matriculas.map(matricula => {
          return matricula.Curso.nombre;
        });
  
        data = {
          total_registros: matriculas.length,
          cursos: cursos
        };
      } else {
        data = {
          message: "El estudiante no tiene cursos matriculados"
        };
      }
  
      response.success(req, res, data, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
};

const create = async (req,res,next)=>{
    try {
        const data = req.body;
        await Estudiante.sync();
        const createdEstudiante = await Estudiante.create(data);
        let message;
        if (createdEstudiante.id) {
            message = {
                msg: "registro efectuado exitosamente",
                regId: createdEstudiante.id
            }
        } else {
            message = {
                msg: "error, usuario no creado"
            }
        }
        response.success(req,res,message,200);
    } catch (error) {
        response.error(req,res,error,500)
    }
};

const update = async(req,res,next)=>{
    try {
        const data = req.body;
        const id = req.params.id
        const updatedEstudiante = await Estudiante.update(data,{ where: {id}});
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
        const deleteEstudiante = await Estudiante.destroy({where:{id}})
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
    getCursos,
    create,
    update,
    deleted,
}