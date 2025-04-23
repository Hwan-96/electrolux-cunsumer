import React from 'react';
import * as ProductCategoryAPI from '@/components/admin/mock/MOCK_ctgr_prd';
import CategoryForm from './CategoryForm';

const Prd = () => {
  // 카테고리 레벨 설정
  const levels = [
    {
      title: '브랜드',
      getData: ProductCategoryAPI.getBrands,
      addItem: ProductCategoryAPI.addBrand,
      deleteItem: ProductCategoryAPI.deleteBrand,
      updateItem: (oldName, newName) => {
        if (ProductCategoryAPI.addBrand(newName)) {
          // 모든 제품군 복사
          const productGroups = ProductCategoryAPI.getProductGroups(oldName);
          productGroups.forEach(pg => {
            ProductCategoryAPI.addProductGroup(newName, pg);
            
            // 각 제품군의 모든 제품명 복사
            const productNames = ProductCategoryAPI.getProductNames(oldName, pg);
            productNames.forEach(pn => {
              ProductCategoryAPI.addProductName(newName, pg, pn);
              
              // 각 제품명의 모든 모델명 복사
              const modelNumbers = ProductCategoryAPI.getModelNumbers(oldName, pg, pn);
              modelNumbers.forEach(mn => {
                ProductCategoryAPI.addModelNumber(newName, pg, pn, mn);
              });
            });
          });
          
          // 원래 브랜드 삭제
          ProductCategoryAPI.deleteBrand(oldName);
          return true;
        }
        return false;
      },
      reorderItems: ProductCategoryAPI.reorderBrands
    },
    {
      title: '제품군',
      getData: ProductCategoryAPI.getProductGroups,
      addItem: ProductCategoryAPI.addProductGroup,
      deleteItem: ProductCategoryAPI.deleteProductGroup,
      updateItem: (oldName, newName, brand) => {
        if (ProductCategoryAPI.addProductGroup(brand, newName)) {
          // 모든 제품명 복사
          const productNames = ProductCategoryAPI.getProductNames(brand, oldName);
          productNames.forEach(pn => {
            ProductCategoryAPI.addProductName(brand, newName, pn);
            
            // 각 제품명의 모든 모델명 복사
            const modelNumbers = ProductCategoryAPI.getModelNumbers(brand, oldName, pn);
            modelNumbers.forEach(mn => {
              ProductCategoryAPI.addModelNumber(brand, newName, pn, mn);
            });
          });
          
          // 원래 제품군 삭제
          ProductCategoryAPI.deleteProductGroup(brand, oldName);
          return true;
        }
        return false;
      },
      reorderItems: ProductCategoryAPI.reorderProductGroups
    },
    {
      title: '제품명',
      getData: ProductCategoryAPI.getProductNames,
      addItem: ProductCategoryAPI.addProductName,
      deleteItem: ProductCategoryAPI.deleteProductName,
      updateItem: (oldName, newName, brand, productGroup) => {
        if (ProductCategoryAPI.addProductName(brand, productGroup, newName)) {
          // 모든 모델명 복사
          const modelNumbers = ProductCategoryAPI.getModelNumbers(brand, productGroup, oldName);
          modelNumbers.forEach(mn => {
            ProductCategoryAPI.addModelNumber(brand, productGroup, newName, mn);
          });
          
          // 원래 제품명 삭제
          ProductCategoryAPI.deleteProductName(brand, productGroup, oldName);
          return true;
        }
        return false;
      },
      reorderItems: ProductCategoryAPI.reorderProductNames
    },
    {
      title: '모델명',
      getData: ProductCategoryAPI.getModelNumbers,
      addItem: ProductCategoryAPI.addModelNumber,
      deleteItem: ProductCategoryAPI.deleteModelNumber,
      updateItem: (oldName, newName, brand, productGroup, productName) => {
        ProductCategoryAPI.deleteModelNumber(brand, productGroup, productName, oldName);
        return ProductCategoryAPI.addModelNumber(brand, productGroup, productName, newName);
      },
      reorderItems: ProductCategoryAPI.reorderModelNumbers
    }
  ];
  
  return <CategoryForm levels={levels} />;
};

export default Prd;
