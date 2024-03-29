import { NextApiRequest, NextApiResponse } from "next";
import { Items } from "./data/items";

interface IItems {
  id: number;
  nome: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    res.json(Items);
  } else if (req.method === "POST") {
    try {
      const { id, nome } = req.body

      if (!id || !nome || typeof nome !== "string") {
        res.status(400).json({ error: "ID e nome são obrigatórios para adicionar um item." });
        return;
      }

      const item: IItems = {
        id,
        nome,
      };

      Items.push(item);
      res.status(201).json(item); // Responder com o item adicionado
    } catch (error) {
      res.status(400).json({ error: "Erro ao analisar o corpo da solicitação." });
    }
  } else if (req.method === 'DELETE' && typeof id === 'string') {
    const itemId = parseInt(id, 10);
    const index = Items.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      Items.splice(index, 1);
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
