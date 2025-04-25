import { updateMockData, deleteMockData, addMockData, getMockDataById } from '@/components/admin/mock/MOCK_cleanUp';
import DetailForm from './DetailForm';

const CleanUpDetail = () => {
  return (
    <DetailForm
      title="청소 설명서"
      listPath="/mng/dwn/cleanup"
      addData={addMockData}
      updateData={updateMockData}
      deleteData={deleteMockData}
      getDataById={getMockDataById}
      filePathField="filePath"
    />
  );
};

export default CleanUpDetail;
