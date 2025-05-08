"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateItemData } from '@/types/item';
import ItemDB from '@/utils/db';
import ItemForm from '@/components/ItemForm';

export default function CreateItemPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateItemData) => {
    setIsLoading(true);
    
    try {
      // Save the item
      await ItemDB.create(data);
      
      // Navigate back to home page
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Failed to create item:', error);
      alert('Ha ocurrido un error al crear el elemento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100">
          <div className="bg-pink-100 p-6">
            <h1 className="text-2xl font-bold text-purple-800 flex items-center">
              <span className="mr-2">✨</span>
              Crear Nuevo Elemento
            </h1>
          </div>
          
          <div className="p-6">
            <ItemForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
