const model = require('../models/index');

exports.getAll = async (req, res) => {
    try {
        let data = await model.Usuario.findAll({});
        res.status(200).json({
            usuarios: data
        })
    } catch (err) {
        res.status(400).json({
            data: [],
            error: err
        })
    }
}

exports.getById = async (req, res) => {
    try {
        let data = await model.Usuario.findByPk(req.params.id);
        res.status(200).json({
            Usuario: data
        })
    } catch (err) {
        res.status(400).json({
            data: [],
            error: err
        })
    }
}

exports.add = async (req, res) => {
    try {
        let retorno = await model.Usuario.create({
            nome: req.body.nome,
            idade: req.body.idade
        })
        res.status(201).json({
            result: retorno
        })
    } catch (err) {
        res.status(400).json({
            data: [],
            error: err
        })
    }
}

exports.update = async (req, res) => {
    try {
        let update = req.body.updates;
        typeof update.id != "undefined" ? delete update.id : '' ;

        let result = await model.Usuario.update(update,
        { where: {id: req.params.id}});

        res.status(201).json({
            data: result
        })
    }catch (err){
        console.error(err);
        res.status(400).json({
            data: [],
            error: err
        })
    }
}

exports.delete = async (req, res) => {
    try{
        let id = req.params.id;
        await model.Usuario.destroy({where: {id: id}})

        res.status(200).json({
            mensagem: "Usuario de "+id+" apagado com sucesso!"
        })
        
    } catch (err) {
        res.status(400).json({
            data: [],
            error: err
        })
    }
}