import mongoose, { Schema } from "mongoose";

const envSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true },
);

const EnvFile = mongoose.model("EnvFile", envSchema);

export { EnvFile };
