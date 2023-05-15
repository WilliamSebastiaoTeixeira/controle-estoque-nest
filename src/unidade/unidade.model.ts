import * as mongoose from "mongoose"

export const UnidadeSchema = new mongoose.Schema(
  {
    produtoId: {
      type: String,
      required: true 
    },

    descricao: {
      type: String,
      default: () => '' 
    },

    dataValidade: {
      type: Date,
      default: () => null
    },

    dataInserido: {
      type: Date,
      required: true
    },

    dataRemovido: {
      type: Date,
      default: () => null
    },
  },
)

export interface UnidadeObject {
  produtoId: string
  descricao: string
  dataValidade: Date | null
  dataInserido: Date
  dataRemovido: Date | null
}

export interface Unidade extends mongoose.Document, UnidadeObject {}