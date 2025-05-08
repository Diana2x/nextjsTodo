import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Item, CreateItemData } from '@/types/item';
import Button from './Button';

type ItemFormProps = {
  initialData?: Item;
  onSubmit: (data: CreateItemData) => void;
  isLoading?: boolean;
};

const ItemForm: React.FC<ItemFormProps> = ({ 
  initialData, 
  onSubmit,
  isLoading = false
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateItemData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-purple-700">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-gray-900"
          placeholder="Título del elemento"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-purple-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-gray-900"
          placeholder="Descripción del elemento"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-purple-700">
          Categoría
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-pink-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-gray-900"
        >
          <option value="" disabled>Selecciona una categoría</option>
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="hogar">Hogar</option>
          <option value="estudio">Estudio</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div className="flex space-x-3">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
        >
          {isLoading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
        </Button>
        
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="flex-1"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;
