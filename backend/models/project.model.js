import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);


projectSchema.methods.updateRecent = async function () {
  this.recentAt = Date.now();
  return await this.save();
};

const Project = mongoose.model("Project", projectSchema);
export { Project };
