import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

//FindAll
export const getPosts = async(req, res)=>{
    try {
        const postMessage = await PostMessage.find();

        //console.log(postMessage);

        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
  }

  //Create
export const createPost = async(req,res) =>{
    const post = req.body;

    const newPost = PostMessage(post);

 try {
    await newPost.save();

    res.status(201).json(newPost);
 } catch (error) {
    res.status(409).json({message: error.message});
 }
}

//UPDATE
export const updatePost = async(req,res) =>{
 const { id: _id } = req.params;
 const post= req.body;
 
 if (!mongoose.Types.ObjectId.isValid(_id))  
  return res.status(404).send('no post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

 res.json(updatedPost);
}

//DELETE
export const deletePost = async (req,res) =>{
    //get the ID or fetch the ID
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))  
  return res.status(404).send('no post with that id');
  
  await PostMessage.findByIdAndRemove(id);
 
  console.log('DELETE');

  res.json({ message: 'Post Deleted Successfully' });

}

//LIKE POST
export const likePost = async(req,res) =>{
   //get the ID or fetch the ID
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id))  
  return res.status(404).send('no post with that id');
  
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});

  res.json(updatedPost);
}