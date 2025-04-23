import React from 'react';
import * as QnaAPI from '@/components/admin/mock/MOCK_ctgr_qna';
import CategoryForm from './CategoryForm';

const Qna = () => {
  // 카테고리 레벨 설정
  const levels = [
    {
      title: '카테고리',
      getData: QnaAPI.getCategories,
      addItem: QnaAPI.addCategory,
      deleteItem: QnaAPI.deleteCategory,
      updateItem: (oldName, newName) => {
        // QNA API에서 카테고리 이름 변경 기능을 확인하고 호출하는 로직
        // 또는 기본 구현을 제공
        const success = QnaAPI.addCategory(newName);
        if (success) {
          const subCategories = QnaAPI.getSubCategories(oldName);
          subCategories.forEach(sub => {
            QnaAPI.addSubCategory(newName, sub);
            
            // 각 서브 카테고리의 QNA 항목 복사
            const qnaItems = QnaAPI.getQnaItems(oldName, sub);
            qnaItems.forEach(item => {
              QnaAPI.addQnaItem(newName, sub, item);
            });
          });
          
          QnaAPI.deleteCategory(oldName);
          return true;
        }
        return false;
      },
      reorderItems: QnaAPI.reorderCategories
    },
    {
      title: '세부 카테고리',
      getData: QnaAPI.getSubCategories,
      addItem: QnaAPI.addSubCategory,
      deleteItem: QnaAPI.deleteSubCategory,
      updateItem: (oldName, newName, category) => {
        // 서브 카테고리 이름 변경 로직
        const success = QnaAPI.addSubCategory(category, newName);
        if (success) {
          const qnaItems = QnaAPI.getQnaItems(category, oldName);
          qnaItems.forEach(item => {
            QnaAPI.addQnaItem(category, newName, item);
          });
          
          QnaAPI.deleteSubCategory(category, oldName);
          return true;
        }
        return false;
      },
      reorderItems: QnaAPI.reorderSubCategories
    },
    {
      title: 'QNA 항목',
      getData: QnaAPI.getQnaItems,
      addItem: QnaAPI.addQnaItem,
      deleteItem: QnaAPI.deleteQnaItem,
      updateItem: (oldName, newName, category, subCategory) => {
        return QnaAPI.renameQnaItem(category, subCategory, oldName, newName);
      },
      reorderItems: QnaAPI.reorderQnaItems
    }
  ];
  
  return <CategoryForm levels={levels} />;
};

export default Qna;

