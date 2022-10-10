const Breve = require('../models/breve-model');
var fs = require('fs');

createBreve = (req, res) => {
    

    if(!req.body){
        return res.status(400).json({
            succes:false,
            error: 'You must provide a breve'
        })
    }

    if (!req.file) return res.send('Please upload a file')


    
//photo : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    const breve = new Breve({
        titre : req.body.titre,
        description: req.body.description,
        photo : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    

    if(!breve){
        return res.status(400).json({success: false, error: err})
    }

    breve
        .save()
        .then(()=> {
            return res.status(201).json({
                succes: true,
                id: breve.photo,
                message: 'Breve créée',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'La Breve n\'a pas été créée',
            })
        })
}

updateBreve = async(req, res) => {
    const body = req.body
    if (!body){
        return res.status(400).json({
            success : false,
            error : 'You must provide a body to update',
        })
    }

    Breve.findOne({_id:req.params.id}, (err, breve) => {
        if(err){
            return res.status(404).json({
                err,
                message: 'Breve non trouvée',
            })
        }
        breve.titre= body.titre
        breve.description= body.description
        breve.photo= body.photo
        breve
            .save()
            .then(() => {
                return res.status(200).json({
                    succes: true,
                    id: breve._id,
                    message:'Breve mise à jour',
                })
            })
            .catch(error => {
                return res.staus(404).json({
                    error,
                    message: 'Breve non trouvée'
                })
            })
    })
}

deleteBreve = async (req, res) => {
    await Breve.findOneAndDelete({ _id: req.params.id }, (err, breve) => {
        if(err) {
            return res.status(400).json({succes:false, error:err})
        }
        if(!breve) {
            return res
                .status(404)
                .json({ succes: false, error: 'Breve non trouvée'})
        }
        return res.status(200).json({succes: true, data: breve})
    }).catch(err => console.log(err))
}

getBreveById = async(req, res) => {
    await Breve.findOne({_id: req.params.id}, (err, breve) => {
        if (err) {
            return res.status(400).json({succes:false, error: err})
        }
        if (!breve){
            return res.status(404).json({success: false, error:' Breve non trouvée'})
        }
        return res.status(200).json({ succes: true, data: breve})
    }).catch(err => console.log(err))
}

getBreves = async(req, res) => {
    await Breve.find({},(err, breves) => {
        if(err){
            return res.status(400).json( {succes:false, error:err})
        }
        if(!breves.length) {
            return res.status(404).json({succes: false, error : 'Breves non trouvées'})
        }
        return res.status(200).json({succes: true, data: breves})
    }).catch(err => console.log(err))
}

module.exports ={
    createBreve,
    updateBreve,
    deleteBreve,
    getBreveById,
    getBreves,
}