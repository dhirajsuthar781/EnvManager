import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recentAt: {
      type: Date,
      default: Date.now,
    },
    sharedWith: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["editor", "viewer"],
          default: "viewer",
        },
      },
    ],
  },
  { timestamps: true },
);

projectSchema.methods.updateRecent = async function () {
  this.recentAt = Date.now();
  return await this.save();
};

const Project = mongoose.model("Project", projectSchema);
export { Project };
