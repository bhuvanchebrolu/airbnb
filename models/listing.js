let mongoose=require("mongoose");
let {Schema}=mongoose;
const Review=require("./review.js");

let listingSchema=new Schema({
    title:{
        type:String,
        requires:true,
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number,
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
    
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;