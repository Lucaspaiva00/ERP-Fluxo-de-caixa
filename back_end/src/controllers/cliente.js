const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require("express");

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const read = async (req, res) => {
    const cliente = await prisma.clientes.findMany();
    return res.json(cliente)
}

const create = async (req, res) => {
    try {
        const data = req.body;
        const cliente = await prisma.clientes.create({
            data: data
        });
        res.redirect("http://127.0.0.1:5500/front_end/buscarCliente.html");
        // return res.status(201).json(cliente).end();

    } catch (error) {
        // return res.status(400).json(error).end();
        res.redirect("http://127.0.0.1:5500/front_end/criarCliente.html");
    }
}

const update = async (req, res) => {
    const data = req.body;
    let cliente = await prisma.clientes.update({
        data: data,
        where: {
            id: parseInt(req.body.id)
        }
    });
    res.status(202).json(cliente).end();
    console.log("Cliente atualizado com sucesso");
  }

const apagar = async (req, res) => {
    const cliente = await prisma.clientes.delete({
      where: {
        id: parseInt(req.params.id)
      }
  
    });
    res.status(204).json(cliente).end();
    console.log("Cliente excluído com sucesso");
  };

module.exports = {
    read,
    create,
    update,
    apagar
};