"use client";

import { useEffect, useState } from 'react';
import { Item } from '@/types/item';
import ItemDB from '@/utils/db';
import ItemCard from '@/components/ItemCard';
import Button from '@/components/Button';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load items from database
    const loadItems = async () => {
      try {
        const data = await ItemDB.getAll();
        setItems(data);
      } catch (error) {
        console.error('Error loading items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás segura de que deseas eliminar este elemento?')) {
      try {
        await ItemDB.delete(id);
        setItems(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('No se pudo eliminar el elemento. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            ✿ Mi Colección ✿
          </h1>
          <p className="text-lg text-pink-700 max-w-2xl mx-auto">
            Un hermoso lugar para guardar y organizar tus elementos favoritos
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Button href="/items/create" className="px-6 py-3">
            ✨ Crear Nuevo Elemento
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin"></div>
            <div className="text-pink-500 text-xl">Cargando elementos...</div>
            <p className="text-purple-400 text-sm max-w-md text-center">Conectando con la base de datos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-xl border border-pink-100 shadow-sm">
            <div className="text-5xl mb-4">🌸</div>
            <h3 className="text-xl font-medium text-purple-700 mb-2">No hay elementos</h3>
            <p className="text-pink-600 mb-6">¡Comienza creando tu primer elemento!</p>
            <Button href="/items/create">
              ✨ Crear Ahora
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
