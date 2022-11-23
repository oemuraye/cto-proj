// import mongoose from 'mongoose'
import postModal from '../models/Posts.js'
import excelJS from 'exceljs'

export const getAllReading = async (req, res) => {
  try {
    const readings = await postModal.find();

    res.status(200).json(JSON.stringify(readings));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const postReading = async (req, res) => {
  try {
    const post = req.query;
  
    if (post.length == null) {
      return res.status(404).send("No reading was inputed");
    }
      const newPost = new postModal(post);
      await newPost.save();
      res.status(201).send("done");
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

export const getCurrent = async (req, res) => {
  try {
    let current = await postModal.find({}, { _id: 0, current: 1 });

    res.status(200).send(current);
  } catch (err) {
    console.error(err);
  }
}
export const getvoltage = async (req, res) => {
  try {
    let voltage = await postModal.find({}, { _id: 0, voltage: 1 });

    res.status(200).send(voltage);
  } catch (err) {
    console.error(err);
  }
}
export const getPower = async (req, res) => {
  try {
    let power = await postModal.find({}, { _id: 0, power: 1 });

    res.status(200).send(power);
  } catch (err) {
    console.error(err);
  }
}
export const getEnergy = async (req, res) => {
  try {
    let energy = await postModal.find({}, { _id: 0, energy: 1, createdAt: 1 });

    res.status(200).send(energy);
  } catch (err) {
    console.error(err);
  }
}
export const getDbExcel = async (req, res) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Meter Readings');
  const path = './files';
  worksheet.columns = [
    {header: "S no.", key: "s_no", width: 10},
    {header: "Current", key: "current", width: 10},
    {header: "Voltage", key: "voltage", width: 10},
    {header: "Power", key: "power", width: 10},
    {header: "Energy", key: "energy", width: 10},
    {header: "Date", key: "createdAt", width: 15},
  ]

  // looping through the data
  let conuter = 1;
  const readings = await postModal.find();


 readings.forEach(async (reading) => {
   reading.s_no = conuter,
    worksheet.addRow(reading)
    conuter++;
  })
  //  Making first line in excel bold
  worksheet.getRow(1).font = {bold: true};

  try {
    const dbExcel = await workbook.xlsx.writeFile(`${path}/meter_readings.xlsx`)
    res.status(200).download(`${path}/meter_readings.xlsx`); 
  } catch (error) {
    res.send({
      status: "error",
      message: "Something went wrong" + error.message,
    })
  }
}