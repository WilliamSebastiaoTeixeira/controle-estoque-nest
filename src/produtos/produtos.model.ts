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
    qtdUnidades: {
      type: Number, 
      default: () => 0
    },
    deleted: {
      type: Boolean,
      required: true,
    },
    subModulo: {
      type: String,
      default: () => undefined
    }
  },
  { timestamps: true }
)

export interface Produto extends mongoose.Document {
  _id: string;
  nome: string;
  descricao: string;
  qtdUnidades: number; 
  deleted: boolean;
  subModulo?: string
}
