import {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const editCurrencyExchange = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    
    const {cup, eur} = req.body;
    
    const currencyExchange = await prisma.currencyExchange.update({
      where: {
        id: id
      },
      data: {
        cup,
        eur
      }
    });
    
    
    res.status(200).json({
      data: currencyExchange
    })    
  
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getCurrencyExchange = async (req: Request, res: Response) => {
  try {
    const currencyExchange = await prisma.currencyExchange.findMany()

    res.status(200).json({
      data: currencyExchange
    })

  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};