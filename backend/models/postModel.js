const mongoose=require('mongoose')

const postSchema = new mongoose.Schema({
    // Core Fields
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 500
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: v => /^(https?:\/\/).+\.(jpg|jpeg|png|webp|gif)$/i.test(v),
        message: props => `${props.value} is not a valid image URL!`
      }
    },
    
    // Relationships
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    // Metadata
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, {
    toJSON: { virtuals: true },  // Include virtuals when converting to JSON
    toObject: { virtuals: true } // Include virtuals when converting to objects
  });
  
  // Virtual for Comments
  postSchema.virtual('comments', {
    ref: 'Comment',          // The model to use
    localField: '_id',       // Find comments where `localField`
    foreignField: 'post',    // is equal to `foreignField`
    justOne: false           // Set to false for array of comments
  });
  
  // Indexes
  postSchema.index({ title: 'text', description: 'text' });
  postSchema.index({ createdAt: -1 });
  postSchema.index({ category: 1 });
  
module.exports=mongoose.model('Post',postSchema)