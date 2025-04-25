import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Input, DatePicker, message, Image, Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { getMockData, updateMockData, deleteMockData, addMockData } from '@/components/admin/mock/MOCK_EventWin';
import dayjs from 'dayjs';
import QuillEditor from '@/components/admin/common/QuillEditor';

const { RangePicker } = DatePicker;

const EventWinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewMode = id === 'new';
  
  const initialNewState = {
    title: '',
    content: '',
    startDate: null,
    endDate: null,
    dateRange: null,
    image: null,
    fileList: [],
  };

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState(initialNewState);
  
  useEffect(() => {
    if (!isNewMode) {
      // TODO: 실제 API 호출로 변경
      const data = getMockData().find(item => item.id === parseInt(id));
      if (data) {
        setDetail({
          ...data,
          dateRange: [
            data.startDate ? dayjs(data.startDate) : null,
            data.endDate ? dayjs(data.endDate) : null
          ],
          fileList: data.image ? [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: data.image,
            }
          ] : []
        });
      }
      setLoading(false);
    }
  }, [id, isNewMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!isNewMode) {
      setDetail({...detail, [name]: value});
    } else {
      setNewItem({...newItem, [name]: value});
    }
  };

  const handleContentChange = (content) => {
    if (!isNewMode) {
      setDetail({...detail, content});
    } else {
      setNewItem({...newItem, content});
    }
  };

  const handleDateRangeChange = (dates) => {
    if (!isNewMode) {
      setDetail({
        ...detail, 
        dateRange: dates,
        startDate: dates?.[0]?.format('YYYY-MM-DD'),
        endDate: dates?.[1]?.format('YYYY-MM-DD')
      });
    } else {
      setNewItem({
        ...newItem, 
        dateRange: dates,
        startDate: dates?.[0]?.format('YYYY-MM-DD'),
        endDate: dates?.[1]?.format('YYYY-MM-DD')
      });
    }
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    if (!isNewMode) {
      setDetail({...detail, fileList: newFileList});
      
      // 실제로는 업로드된 이미지 URL을 저장
      if (newFileList.length > 0 && newFileList[0].status === 'done') {
        setDetail({...detail, fileList: newFileList, image: newFileList[0].url || URL.createObjectURL(newFileList[0].originFileObj)});
      } else {
        setDetail({...detail, fileList: newFileList, image: null});
      }
    } else {
      setNewItem({...newItem, fileList: newFileList});
      
      // 실제로는 업로드된 이미지 URL을 저장
      if (newFileList.length > 0 && newFileList[0].status === 'done') {
        setNewItem({...newItem, fileList: newFileList, image: newFileList[0].url || URL.createObjectURL(newFileList[0].originFileObj)});
      } else {
        setNewItem({...newItem, fileList: newFileList, image: null});
      }
    }
  };

  const handleSave = () => {
    try {
      const dataToSave = !isNewMode ? {
        ...detail,
        startDate: detail.dateRange?.[0]?.format('YYYY-MM-DD'),
        endDate: detail.dateRange?.[1]?.format('YYYY-MM-DD'),
      } : {
        ...newItem,
        startDate: newItem.dateRange?.[0]?.format('YYYY-MM-DD'),
        endDate: newItem.dateRange?.[1]?.format('YYYY-MM-DD'),
      };

      if (!dataToSave.title) {
        message.error('제목을 입력하세요');
        return;
      }

      if (!dataToSave.content) {
        message.error('내용을 입력하세요');
        return;
      }

      if (!dataToSave.startDate || !dataToSave.endDate) {
        message.error('기간을 선택하세요');
        return;
      }

      if (isNewMode) {
        addMockData({
          title: dataToSave.title,
          content: dataToSave.content,
          startDate: dataToSave.startDate,
          endDate: dataToSave.endDate,
          image: dataToSave.image
        });
        message.success('등록되었습니다');
      } else {
        updateMockData(parseInt(id), {
          title: dataToSave.title,
          content: dataToSave.content,
          startDate: dataToSave.startDate,
          endDate: dataToSave.endDate,
          image: dataToSave.image
        });
        message.success('수정되었습니다');
      }
      navigate('/mng/event/win');
    } catch (error) {
      console.error('Error saving event:', error);
      message.error('저장 중 오류가 발생했습니다');
    }
  };

  const handleDelete = () => {
    try {
      deleteMockData(parseInt(id));
      message.success('삭제되었습니다');
      navigate('/mng/event/win');
    } catch (error) {
      console.error('Error deleting event:', error);
      message.error('삭제 중 오류가 발생했습니다');
    }
  };

  const handleCancel = () => {
    navigate('/mng/event/win');
  };

  if (loading && !isNewMode) {
    return <div>Loading...</div>;
  }

  // 새 글 작성 모드 렌더링
  if (isNewMode) {
    return (
      <>
        <Card style={{ marginBottom: '20px' }}>
          <Descriptions bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
            <Descriptions.Item label="제목">
              <Input 
                name="title"
                value={newItem.title} 
                onChange={handleInputChange} 
                placeholder="제목을 입력하세요" 
              />
            </Descriptions.Item>
            <Descriptions.Item label="내용">
              <QuillEditor
                value={newItem.content}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요"
                height="300px"
                editorHeight="250px"
              />
            </Descriptions.Item>
            <Descriptions.Item label="기간">
              <RangePicker 
                value={newItem.dateRange}
                onChange={handleDateRangeChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="이미지">
              <Upload
                name="image"
                listType="picture-card"
                fileList={newItem.fileList}
                onChange={handleImageChange}
                beforeUpload={() => false}
                maxCount={1}
              >
                {newItem.fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <ButtonGroup>
          <CommonButton type="primary" onClick={handleSave}>확인</CommonButton>
          <Button onClick={handleCancel}>취소</Button>
          <ButtonGroupRight>
            <Button onClick={handleCancel}>목록</Button>
          </ButtonGroupRight>
        </ButtonGroup>
      </>
    );
  }

  if (!detail) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="제목">
            <Input 
              name="title"
              value={detail.title} 
              onChange={handleInputChange} 
              placeholder="제목을 입력하세요" 
            />
          </Descriptions.Item>
          <Descriptions.Item label="내용">
            <QuillEditor
              value={detail.content}
              onChange={handleContentChange}
              placeholder="내용을 입력하세요"
              height="300px"
              editorHeight="250px"
            />
          </Descriptions.Item>
          <Descriptions.Item label="기간">
            <RangePicker 
              value={detail.dateRange}
              onChange={handleDateRangeChange}
            />
          </Descriptions.Item>
          <Descriptions.Item label="이미지">
            {detail.image && (
              <Image
                width={200}
                src={detail.image}
                style={{ marginBottom: '16px' }}
              />
            )}
            <Upload
              name="image"
              listType="picture-card"
              fileList={detail.fileList}
              onChange={handleImageChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              {detail.fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <ButtonGroup>
        <ButtonGroupLeft>
          <Button danger onClick={handleDelete}>삭제</Button>
        </ButtonGroupLeft>
        <CommonButton type="primary" onClick={handleSave}>확인</CommonButton>
        <Button onClick={handleCancel}>취소</Button>
        <ButtonGroupRight>
          <Button onClick={handleCancel}>목록</Button>
        </ButtonGroupRight>
      </ButtonGroup>
    </>
  );
};

export default EventWinDetail; 