const express = require('express');
const router = express.Router();
const Menu = require("../models/Menu");

//post method for menu
router.post("/menu", async(req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data);
        const savedMenu = await newMenu.save();
        console.log("Menu data is saved successfully");
        res.status(200).json({
            success:true,
            savedMenu:savedMenu
        });
    } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
});

//get method for menu
router.get("/menu", async(req, res) => {
    try{
        const data = await Menu.find();
        console.log("data fetched successfully");
        res.status(200).json({
            data
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
});

router.get("/menu/:taste", async(req, res) => {
    try {
        const taste = req.params.id;
        if(taste === "Sour" || taste === "Spicy" || taste === "Sweet") {
            const response = await Menu.findOne({taste:taste});
            return res.status(200).json({
                success:true,
                response
            });
        }
        if(!response) {
            return res.status(400).json({
                success:false,
                message:"Menu not found"
            });
        }

        return response.status(200).json({
            success:true,
            response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
});

router.put("/menu/:id" , async(req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenu = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updatedMenu, {new:true});
        if(!response) {
            return res.status(400).json({
                success:false,
                message:"Menu not found"
            });
        }
        return res.status(200).json({
            success:true,
            response
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
});

router.delete("/menu/:id", async(req, res) => {
    try {
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId);
        if(!response) {
            return res.status(400).json({
                success:false,
                message:"Menu not found"
            });
        }
        return res.status(200).json({
            success:true,
            response
        })
    } catch ( error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
})

module.exports = router;
//enum:["Sweet", "Spicy", "Sour"],