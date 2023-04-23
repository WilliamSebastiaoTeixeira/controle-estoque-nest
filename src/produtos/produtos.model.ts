import * as mongoose from "mongoose"

export const ProdutoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      default: () => undefined
    },
    deleted: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
)

export interface Produto extends mongoose.Document {
  _id: string;
  nome: string;
  descricao: string;
  deleted: boolean;
}
