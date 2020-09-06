import * as mongoose from 'mongoose'

export const JogadorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telefone: {
        type: String,
        required: true,
        unique: true,
    },
    ranking: String,
    posicaoRanking: String,
    imageUrl: String,
}, {
    timestamps: true,
    collection: "jogadores",
});


