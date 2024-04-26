const express = require('express');
const router = express.Router();
const Person = require("../models/Person")

// post methods for person
router.post("/person", async(req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        console.log('Data saved successfully');
        res.status(200).json({
            success:true,
            savedPerson:savedPerson
        })
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error while saving person details"
        })
    }
});

// get method to get the person
router.get("/person", async(req, res) => {
    try {
        const data = await Person.find();
        console.log("data fetched successfully");
        res.status(200).json({
            data
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
});


router.get("/person/:workType", async(req, res)=> {
    try {
        const workType = req.params.workType;
        if(workType === "Chef" || workType === "Manager" || workType === "Waiter") {
            const response = await Person.findOne({work:workType});
            res.status(200).json({
                response
            });
        }
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Invalid workType"
        });
    }
});

router.put('/person/:id', async(req, res) => {
    try{
        const personId = req.params.id;
        const updatedData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedData, {
            new:true,
            runValidators:true
        });

        if(!response) {
            return res.status(404).json({
                success:false,
                message:"Person not found"
            })
        }

        console.log("data updated Successfully");
        res.status(200).json({
            response
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
});

router.delete("/person/:id", async(req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response) {
            return res.status(404).json({
                success:false,
                message:"Person not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Person deleted successfully"
        })
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
});

module.exports = router;