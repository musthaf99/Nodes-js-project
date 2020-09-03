const express=require('express');
const router=express.Router();
const bucketlist=require('../Models/list');

router.get('/',(req,res)=>
{
	 bucketlist.getAllLists((err,lists)=>
	 {
		if(err){
			res.join({sucess:false,message:'Failed to load all lists. Error:(err)'});
		}
		else
		{
			res.write(JSON.stringfy({{success: true, lists:lists},null,2));
			res.end();	
		}
	});
});

router.post('/',(req,res,next)=>{
	consloe.log(req.body);
	let newList=new bucketlist({
		title:req.body.title,
		descripiton: req.body.description,
		category:req.body.category
	});
	bucketlist.addList(newList,(err,list)=>
	{
		if(err)
		{
			res.join({sucess:false,message:'Failed to create all lists. Error:(err)'});			
		}
		else
		{
			res.json({success:true,message:"Added successfully."});
		}
	});
});
router.delete('/:id', (req,res,next)=> {
	let id = req.params.id;
	console.log(id);
	bucketlist.deleteListById(id,(err,list) => {
		if(err) {
			res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
		}
		else if(list) {
			res.json({success:true, message: "Deleted successfully"});
		}
		else
			res.json({success:false});
	})
});

module.exports = router;
