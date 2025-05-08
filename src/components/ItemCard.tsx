import React from 'react';
import { Item } from '@/types/item';
import Button from './Button';

// Función para obtener el color de fondo según la categoría
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'personal':
      return 'bg-pink-100 text-pink-800';
    case 'trabajo':
      return 'bg-purple-100 text-purple-800';
    case 'hogar':
      return 'bg-blue-100 text-blue-800';
    case 'estudio':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Función para obtener la etiqueta de la categoría
const getCategoryLabel = (category: string): string => {
  switch (category) {
    case 'personal':
      return 'Personal';
    case 'trabajo':
      return 'Trabajo';
    case 'hogar':
      return 'Hogar';
    case 'estudio':
      return 'Estudio';
    default:
      return 'Otro';
  }
};

type ItemCardProps = {
  item: Item;
  onDelete: (id: string) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 hover:shadow-lg transition-shadow duration-300">
      <div className="h-32 w-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-pink-300 text-4xl mb-2">✿</div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
            {getCategoryLabel(item.category)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-purple-800 mb-2">{item.title}</h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        
        <div className="text-xs text-gray-500 mb-4">
          {new Date(item.createdAt).toLocaleDateString()}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            href={`/items/edit/${item.id}`}
            variant="secondary"
            className="flex-1 text-sm"
          >
            Editar
          </Button>
          
          <Button 
            onClick={() => onDelete(item.id)}
            variant="danger"
            className="flex-1 text-sm"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
