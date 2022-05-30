// import mongoose from 'mongoose'
import postModal from '../models/Posts.js'

export const postReading = async (req, res) => {
  const post = req.query;

  const newPost = new postModal(post);

  try {
    await newPost.save();
    console.log(post);
  
    res.status(201).send("done");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};

export const getCurrent = async (req, res) => {
  try {
    let current = await postModal.find({}, { _id: 0, current: 1, createdAt: 1 });

    res.status(200).send(current);
  } catch (err) {
    console.error(err);
  }
}
export const getvoltage = async (req, res) => {
  try {
    let voltage = await postModal.find({}, { _id: 0, voltage: 1, createdAt: 1 });

    res.status(200).send(voltage);
  } catch (err) {
    console.error(err);
  }
}
export const getPower = async (req, res) => {
  try {
    let power = await postModal.find({}, { _id: 0, power: 1, createdAt: 1 });

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