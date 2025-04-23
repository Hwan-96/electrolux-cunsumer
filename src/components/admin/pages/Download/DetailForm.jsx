import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Modal, Upload } from 'antd';
import { Button, Card, Descriptions, Input, Select, Form } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// 브랜드 옵션
const brandOptions = [
  { value: 'Electrolux', label: 'Electrolux' },
  { value: 'AEG', label: 'AEG' },
];

// 제품군 옵션 (브랜드에 따라 다른 옵션 제공)
const getProductGroupOptions = (brand) => {
  if (brand === 'Electrolux') {
    return [
      { value: '스틱청소기', label: '스틱청소기' },
      { value: '진공청소기', label: '진공청소기' },
      { value: '로봇청소기', label: '로봇청소기' },
      { value: '에어프라이어', label: '에어프라이어' },
    ];
  } else if (brand === 'AEG') {
    return [
      { value: '세탁기', label: '세탁기' },
      { value: '건조기', label: '건조기' },
    ];
  }
  return [];
};

// 제품명 옵션 (브랜드와 제품군에 따라 다른 옵션 제공)
const getProductNameOptions = (brand, productGroup) => {
  if (brand === 'Electrolux') {
    if (productGroup === '스틱청소기') {
      return [
        { value: 'Well Q6', label: 'Well Q6' },
        { value: 'Well Q7', label: 'Well Q7' },
        { value: 'Well Q8', label: 'Well Q8' },
      ];
    } else if (productGroup === '진공청소기') {
      return [
        { value: 'Pure C9', label: 'Pure C9' },
      ];
    }
  } else if (brand === 'AEG') {
    if (productGroup === '세탁기') {
      return [
        { value: 'L8FEC68K', label: 'L8FEC68K' },
      ];
    }
  }
  return [];
};

// 모델명 옵션 (브랜드, 제품군, 제품명에 따라 다른 옵션 제공)
const getModelOptions = (brand, productGroup, productName) => {
  if (brand === 'Electrolux' && productGroup === '스틱청소기' && productName === 'Well Q6') {
    return [
      { value: 'EFP91835', label: 'EFP91835' },
      { value: 'EFP91836', label: 'EFP91836' },
    ];
  }
  return [];
};

/**
 * 재사용 가능한 상세 폼 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 카드 제목
 * @param {string} props.listPath - 목록 페이지 경로
 * @param {function} props.addData - 신규 데이터 추가 함수
 * @param {function} props.updateData - 데이터 업데이트 함수
 * @param {function} props.deleteData - 데이터 삭제 함수
 * @param {function} props.getDataById - ID로 데이터 조회 함수
 * @param {boolean} props.useRichEditor - 리치 에디터(ReactQuill) 사용 여부
 * @param {string} props.filePathField - 파일 경로 필드명 (기본값: 'filePath')
 */
const DetailForm = ({
  title,
  listPath,
  addData,
  updateData,
  deleteData,
  getDataById,
  useRichEditor = false,
  filePathField = 'filePath'
}) => {
  const { id } = useParams();
  const isNewMode = id === 'new';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const initialNewState = {
    modelCtgr1: '',
    modelCtgr2: '',
    modelCtgr3: '',
    modelCtgr4: '',
    title: '',
    content: '',
    fileList: []
  };

  const [productGroupOptions, setProductGroupOptions] = useState([]);
  const [productNameOptions, setProductNameOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!isNewMode) {
      try {
        const fetchedDetail = getDataById(parseInt(id));
        if (!fetchedDetail) {
          message.error('존재하지 않는 데이터입니다.');
          navigate(listPath);
          return;
        }
        
        // 카테고리 옵션 설정
        const productGroups = getProductGroupOptions(fetchedDetail.modelCtgr1);
        const productNames = getProductNameOptions(fetchedDetail.modelCtgr1, fetchedDetail.modelCtgr2);
        const models = getModelOptions(fetchedDetail.modelCtgr1, fetchedDetail.modelCtgr2, fetchedDetail.modelCtgr3);
        
        setProductGroupOptions(productGroups);
        setProductNameOptions(productNames);
        setModelOptions(models);

        // 파일 데이터 처리
        const filePath = fetchedDetail[filePathField];
        if (filePath) {
          setFileList([{
            uid: '-1',
            name: filePath.split('/').pop() || 'document.pdf',
            status: 'done',
            url: filePath,
          }]);
        } else {
          setFileList([]);
        }

        // form 초기화
        form.setFieldsValue({
          modelCtgr1: fetchedDetail.modelCtgr1,
          modelCtgr2: fetchedDetail.modelCtgr2,
          modelCtgr3: fetchedDetail.modelCtgr3,
          modelCtgr4: fetchedDetail.modelCtgr4,
          title: fetchedDetail.title,
          content: fetchedDetail.content || ''
        });
      } catch (error) {
        console.error('Error fetching detail:', error);
        message.error('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    } else {
      // 신규 작성 모드
      setProductGroupOptions([]);
      setProductNameOptions([]);
      setModelOptions([]);
      setFileList([]);
      form.setFieldsValue(initialNewState);
      setLoading(false);
    }
  }, [id, isNewMode, form, navigate, getDataById, listPath, filePathField]);

  // 브랜드 변경 시 이벤트 핸들러
  const handleBrandChange = (value) => {
    const productGroups = getProductGroupOptions(value);
    setProductGroupOptions(productGroups);
    setProductNameOptions([]);
    setModelOptions([]);
    
    form.setFieldsValue({
      modelCtgr2: '',
      modelCtgr3: '',
      modelCtgr4: ''
    });
  };

  // 제품군 변경 시 이벤트 핸들러
  const handleProductGroupChange = (value) => {
    const brand = form.getFieldValue('modelCtgr1');
    const productNames = getProductNameOptions(brand, value);
    setProductNameOptions(productNames);
    setModelOptions([]);
    
    form.setFieldsValue({
      modelCtgr3: '',
      modelCtgr4: ''
    });
  };

  // 제품명 변경 시 이벤트 핸들러
  const handleProductNameChange = (value) => {
    const brand = form.getFieldValue('modelCtgr1');
    const productGroup = form.getFieldValue('modelCtgr2');
    const models = getModelOptions(brand, productGroup, value);
    setModelOptions(models);
    
    form.setFieldsValue({
      modelCtgr4: ''
    });
  };

  // 파일 업로드 관련 처리
  const handleFileChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // 최신 파일 1개만 유지
    setFileList(fileList);
  };

  const handleFileRemove = () => {
    setFileList([]);
    return true;
  };

  const handleFileUpload = (file) => {
    const isPDF = file.type === 'application/pdf';
    const isLt20M = file.size / 1024 / 1024 < 20;

    if (!isPDF) {
      message.error('PDF 파일만 업로드 가능합니다!');
      return Upload.LIST_IGNORE;
    }
    
    if (!isLt20M) {
      message.error('파일 크기는 20MB 이하여야 합니다!');
      return Upload.LIST_IGNORE;
    }
    
    return false; // 수동 업로드 모드
  };

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        const data = {
          ...values,  
          fileList
        };

        try {
          if (isNewMode) {
            addData(data);
            message.success('등록되었습니다');
          } else {
            updateData(parseInt(id), data);
            message.success('수정되었습니다');
          }
          navigate(listPath);
        } catch (error) {
          console.error('Error saving data:', error);
          message.error('저장 중 오류가 발생했습니다.');
        }
      })
      .catch(error => {
        console.error('Error validating form:', error);
        message.error('입력값을 확인해주세요.');
      });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: '삭제',
      content: '정말 삭제하시겠습니까?',
      onOk: () => {
        try {
          deleteData(parseInt(id));
          message.success('삭제되었습니다');
          navigate(listPath);
        } catch (error) {
          console.error('Error deleting data:', error);
          message.error('삭제 중 오류가 발생했습니다.');
        } 
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card title={isNewMode ? `${title} 등록` : `${title} 상세`} style={{ marginBottom: '20px' }}>
        <Form 
          form={form} 
          layout="vertical"
          initialValues={isNewMode ? initialNewState : null}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="카테고리">
              <Form.Item
                name="modelCtgr1"
                rules={[{ required: true, message: '브랜드를 선택해주세요.' }]}
                style={{ display: 'inline-block', marginRight: 20, marginBottom: 0 }}
              >
                <Select 
                  style={{ width: 180 }}
                  placeholder="브랜드 선택"
                  onChange={handleBrandChange}
                  options={brandOptions}
                />
              </Form.Item>
              
              <Form.Item
                name="modelCtgr2" 
                rules={[{ required: true, message: '제품군을 선택해주세요.' }]}
                style={{ display: 'inline-block', marginRight: 20, marginBottom: 0 }}
              >
                <Select 
                  style={{ width: 180 }}
                  placeholder="제품군 선택"
                  onChange={handleProductGroupChange}
                  options={productGroupOptions}
                  disabled={!form.getFieldValue('modelCtgr1')}
                />
              </Form.Item>
              
              <Form.Item
                name="modelCtgr3" 
                rules={[{ required: true, message: '제품명을 선택해주세요.' }]}
                style={{ display: 'inline-block', marginRight: 20, marginBottom: 0 }}
              >
                <Select 
                  style={{ width: 180 }}
                  placeholder="제품명 선택"
                  onChange={handleProductNameChange}
                  options={productNameOptions}
                  disabled={!form.getFieldValue('modelCtgr2')}
                />
              </Form.Item>
              
              <Form.Item
                name="modelCtgr4" 
                rules={[{ required: true, message: '모델명을 선택해주세요.' }]}
                style={{ display: 'inline-block', marginBottom: 0 }}
              >
                <Select 
                  style={{ width: 180 }}
                  placeholder="모델명 선택"
                  options={modelOptions}
                  disabled={!form.getFieldValue('modelCtgr3')}
                />
              </Form.Item>
            </Descriptions.Item>
            
            <Descriptions.Item label="제목">
              <Form.Item
                name="title"
                rules={[{ required: true, message: '제목을 입력해주세요.' }]}
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="제목을 입력하세요" />
              </Form.Item>
            </Descriptions.Item>
            
            <Descriptions.Item label="내용">
              <Form.Item
                name="content"
                rules={[{ required: true, message: '내용을 입력하세요' }]}
                style={{ marginBottom: 0 }}
              >
                {useRichEditor ? (
                  <ReactQuill 
                    theme="snow"
                    style={{ height: 300, marginBottom: 50 }}
                  />
                ) : (
                  <Input.TextArea rows={6} placeholder="내용을 입력하세요" />
                )}
              </Form.Item>
            </Descriptions.Item>
            
            <Descriptions.Item label="첨부파일">
              <Upload
                fileList={fileList}
                onChange={handleFileChange}
                onRemove={handleFileRemove}
                beforeUpload={handleFileUpload}
                listType="text"
              >
                <Button icon={<UploadOutlined />}>첨부파일 업로드</Button>
              </Upload>
              <div style={{ marginTop: 8, color: '#888' }}>
                PDF 파일만 업로드 가능합니다. (최대 20MB)
              </div>
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Card>

      <ButtonGroup>
        <ButtonGroupLeft>
          {!isNewMode && (
            <Button danger onClick={handleDelete}>삭제</Button> 
          )}
        </ButtonGroupLeft>
        <CommonButton type="primary" onClick={handleSave}>
          {isNewMode ? '등록' : '수정'}
        </CommonButton>
        <Button onClick={() => navigate(listPath)}>취소</Button>  
        <ButtonGroupRight>
          <Button onClick={() => navigate(listPath)}>목록</Button>
        </ButtonGroupRight>
      </ButtonGroup>
    </div>
  );
};

export default DetailForm; 