const Matricula = require("../models/matricula.model");
const Curso = require("../models/curso.model");

const response = require("../res/response");
const Estudiante = require("../models/estudiante.model");

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

const getEstudiantes = async (req, res, next) => {
    try {
      const id = req.params.id;
      const matriculas = await Matricula.findAll({
        where: { cursoId: id },
        include: [{
          model: Estudiante,
          attributes: ['id', 'nombre', 'apellido']
        }]
      });
  
      if (matriculas && matriculas.length > 0) {
        const estudiantes = matriculas.map(matricula => {
          return {
            estudiantes_id: matricula.Estudiante.id,
            nombre_estudiantes: `${matricula.Estudiante.nombre} ${matricula.Estudiante.apellido}`
          };
        });
        
        data = estudiantes;
      } else {
        data = {
          message: "El curso no tiene estudiantes matriculados"
        };
      }
      response.success(req, res, data, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
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
    getEstudiantes,
    create,
    update,
    deleted
}