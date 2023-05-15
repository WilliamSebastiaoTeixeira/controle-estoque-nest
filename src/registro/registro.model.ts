import * as mongoose from "mongoose"

export const RegistroSchema = new mongoose.Schema(
  {
    produtos: {
      type: Array,
      required: true,
    },

    usuario: {
      type: String,
      required: true 
    },

    entrada: {
      type: Boolean,
      required: true,
    },

    dataEntrada: {
      type: Date,
      default: () => null
    },

    dataSaida: {
      type: Date,
      default: () => null
    },

    logDeleted: {
      type: Array,
      default: () => []
    }, 

    deleted: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)


export interface Unidade {
  dataValidade: Date
  descricao: string
}

export interface ProdutoUnidades {
  produto: string
  unidades: Unidade[]
}

export interface LogDeleted {
  data: string;
  justificativa: string;
  usuario: string; 
}

export interface Registro extends mongoose.Document {
  _id: string;
  produtos: {
    produto: string
    unidades: string[]
  }[]
  usuario: string;
  entrada: boolean;
  dataEntrada: Date | null; 
  dataSaida: Date | null;
  logDeleted: LogDeleted[];
  deleted: boolean;
}
