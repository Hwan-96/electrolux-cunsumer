import { updateMockData, deleteMockData, addMockData, getMockDataById } from '@/components/admin/mock/MOCK_prdGuide';
import DetailForm from './DetailForm';

const PrdGuideDetail = () => {
  return (
    <DetailForm
      title="제품 가이드"
      listPath="/mng/dwn/manual"
      addData={addMockData}
      updateData={updateMockData}
      deleteData={deleteMockData}
      getDataById={getMockDataById}
      filePathField="filePath"
    />
  );
};

export default PrdGuideDetail;
