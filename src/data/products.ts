import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Bolos de Aniversário', image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg' },
  { id: '2', name: 'Bolos Gourmet', image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg' },
  { id: '3', name: 'Tortas Doces', image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg' },
  { id: '4', name: 'Cupcakes', image: 'https://images.pexels.com/photos/1998634/pexels-photo-1998634.jpeg' },
  { id: '5', name: 'Docinhos', image: 'https://images.pexels.com/photos/1028713/pexels-photo-1028713.jpeg' },
  { id: '6', name: 'Bolos Temáticos', image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bolo de Chocolate Gourmet',
    description: 'Delicioso bolo de chocolate com recheio de brigadeiro e cobertura de ganache',
    price: 45.00,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
    category: 'Bolos Gourmet'
  },
  {
    id: '2',
    name: 'Torta de Morango',
    description: 'Torta cremosa com morangos frescos e chantilly artesanal',
    price: 38.00,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    category: 'Tortas Doces'
  },
  {
    id: '3',
    name: 'Cupcake Red Velvet',
    description: 'Cupcake aveludado com cream cheese e decoração especial',
    price: 12.00,
    image: 'https://images.pexels.com/photos/1998634/pexels-photo-1998634.jpeg',
    category: 'Cupcakes'
  },
  {
    id: '4',
    name: 'Bolo de Aniversário Personalizado',
    description: 'Bolo especial com decoração personalizada para sua festa',
    price: 65.00,
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg',
    category: 'Bolos de Aniversário'
  },
  {
    id: '5',
    name: 'Brigadeiros Gourmet',
    description: 'Conjunto com 12 brigadeiros gourmet de sabores variados',
    price: 24.00,
    image: 'https://images.pexels.com/photos/1028713/pexels-photo-1028713.jpeg',
    category: 'Docinhos'
  },
  {
    id: '6',
    name: 'Bolo Temático Unicórnio',
    description: 'Bolo mágico com decoração de unicórnio em pasta americana',
    price: 78.00,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg',
    category: 'Bolos Temáticos'
  },
];