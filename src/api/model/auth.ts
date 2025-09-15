const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    name: { type: String },
    // content: { type: String },
    // publish: { type: Boolean, default: true },
    // postDate: { type: Date },
    // image: { type: String },
    // embedLink: { type: String },
    // categoryID: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     refPath: "categoryRef",
    //     autopopulate: true,
    //   },
    // ],
    // categoryRef: { type: String },
    // view: { type: Number },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isEdited: { type: Boolean, default: false },
    // created
  },
  {
    timestamps: true,
  }
);
// blogsSchema.plugin(require('mongoose-autopopulate'));
export default function (communityName = "data") {
  return mongoose.model(`${communityName}_auth`, authSchema);
}
