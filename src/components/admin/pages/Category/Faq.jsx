import React from 'react';
import * as FaqAPI from '@/components/admin/mock/MOCK_ctgr_faq';
import CategoryForm from './CategoryForm';

const Faq = () => {
  // 카테고리 레벨 설정
  const levels = [
    {
      title: '카테고리',
      getData: FaqAPI.getCategories,
      addItem: FaqAPI.addCategory,
      deleteItem: FaqAPI.deleteCategory,
      updateItem: (oldName, newName) => {
        return FaqAPI.renameCategory(oldName, newName);
      },
      reorderItems: FaqAPI.reorderCategories
    }
  ];
  
  return <CategoryForm levels={levels} />;
};

export default Faq;