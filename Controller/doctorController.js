import HttpError from "../Models/httpError.js";
import DockerModal from "../Models/userModal.js";

export const dockerController = (req, res, next) =>{
    const dockerData = req.body;
    const doctor = new DockerModal(dockerData);
    console.log(doctor);
    try{
        doctor.save().then(response => {
            res.status(201).json({
                message: 'Doctor added successfully',
                doctor: response,
            });
        }).catch(err => {
            console.error(err);
            return next(new HttpError(500, 'Failed to add doctor'));
        });
    }
    catch(err) {
        console.error(err);
        return next(new HttpError(500, 'Internal server error'));
    }
}