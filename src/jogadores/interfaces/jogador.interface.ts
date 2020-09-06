import { Document } from "mongoose";

export interface IJogador extends Document {
    telefone: string;
    email: string;
    nome: string;
    ranking: string;
    posicaoRanking: string;
    imageUrl: string;
}