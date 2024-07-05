import mongoose from "mongoose";
const { Schema, model } = mongoose;

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        bio: String,
        birthDate: Date,
        books:[{
            type: Schema.Types.ObjectId,
            ref: "Book"
        }]
    },
    { timestamps: true }
);

export default mongoose.models.Author || model("Author", authorSchema)        // to avoid edge case (re-render)
