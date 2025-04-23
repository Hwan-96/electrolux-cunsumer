import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Input, List, Row, Col, Typography, Space } from 'antd';
import { EditOutlined, PlusOutlined, DragOutlined, MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const { Text } = Typography;

const CategoryCard = styled(Card)`
  width: 300px;
  margin-right: 20px;
  margin-bottom: 20px;
  height: 500px;
  overflow: auto;
  
  .ant-card-head {
    background-color: #f5f5f5;
    border-bottom: 1px solid #e8e8e8;
  }
  
  .ant-card-body {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: calc(100% - 57px);
  }
`;

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
`;

const ListItem = styled.div`
  padding: 12px 6px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  
  &:hover {
    background-color: #f9f9f9;
    font-weight: 500;
  }
  
  &.selected {
    background-color: #e6f7ff;
    font-weight: 500;
  }
`;

const CardFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  gap: 20px;
`;

const EditCard = styled(Card)`
  width: 300px;
  height: 500px;
  
  .ant-card-head {
    background-color: #f5f5f5;
  }
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    height: calc(100% - 57px);
  }
`;

const EditForm = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
`;

const SortableItem = styled.div`
  padding: 12px;
  border: 1px solid #f0f0f0;
  background-color: white;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    border-color: #1890ff;
  }
`;

const DragHandle = styled(MenuOutlined)`
  cursor: grab;
  color: #999;
  margin-right: 8px;
  
  &:hover {
    color: #1890ff;
  }
`;

// 정렬 가능한 항목 컴포넌트
function SortableListItem({ id, item, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <SortableItem ref={setNodeRef} style={style}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DragHandle {...attributes} {...listeners} />
        <span>{item}</span>
      </div>
      <Button
        size="small"
        danger
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item);
        }}
      >
        삭제
      </Button>
    </SortableItem>
  );
}

/**
 * 카테고리 관리 공통 컴포넌트
 * 
 * @param {Object} props
 * @param {Array<Object>} props.levels - 카테고리 레벨 설정 (최대 4단계까지 지원)
 *   @param {string} props.levels[].title - 레벨 제목
 *   @param {Function} props.levels[].getData - 해당 레벨의 데이터를 가져오는 함수
 *   @param {Function} props.levels[].addItem - 항목 추가 함수
 *   @param {Function} props.levels[].deleteItem - 항목 삭제 함수
 *   @param {Function} props.levels[].updateItem - 항목 수정 함수
 *   @param {Function} props.levels[].reorderItems - 항목 순서 변경 함수 (선택사항)
 */
const CategoryForm = ({ levels = [] }) => {
  // 상태 관리
  const [levelData, setLevelData] = useState(Array(levels.length).fill([]));
  const [selectedItems, setSelectedItems] = useState(Array(levels.length).fill(null));
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState(0); // 0, 1, 2, 3: 레벨 인덱스
  const [newItemName, setNewItemName] = useState('');
  const [isDraggable, setIsDraggable] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // dnd-kit 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // 초기 데이터 로드
  useEffect(() => {
    if (levels.length > 0 && levels[0].getData) {
      loadLevelData(0);
    }
  }, []);
  
  // 선택된 항목이 변경될 때 하위 레벨 데이터 로드
  useEffect(() => {
    // 선택된 항목이 변경되면 하위 레벨 데이터를 로드
    for (let i = 0; i < selectedItems.length - 1; i++) {
      // 현재 레벨이 선택되었고 다음 레벨의 데이터가 필요한 경우
      if (selectedItems[i] !== null) {
        loadLevelData(i + 1);
      }
    }
  }, [selectedItems]);
  
  // 특정 레벨의 데이터 로드
  const loadLevelData = (levelIndex) => {
    if (!levels[levelIndex] || !levels[levelIndex].getData) return;
    
    let data;
    if (levelIndex === 0) {
      data = levels[levelIndex].getData();
    } else {
      // 상위 레벨의 선택된 항목을 기반으로 데이터 로드
      let parent = selectedItems[levelIndex - 1];
      if (!parent) return;
      
      // 상위 레벨 선택 항목들 수집
      const parentParams = [];
      for (let i = 0; i < levelIndex; i++) {
        parentParams.push(selectedItems[i]);
      }
      
      data = levels[levelIndex].getData(...parentParams);
    }
    
    // 데이터가 배열이 아니거나 빈 배열인 경우 빈 배열로 설정
    data = Array.isArray(data) ? data : [];
    
    setLevelData(prev => {
      const newData = [...prev];
      newData[levelIndex] = data;
      // 하위 레벨 데이터 초기화는 항목 선택 시에만 수행하므로 여기서는 하지 않음
      return newData;
    });
  };
  
  // 항목 선택 처리
  const handleItemSelect = (levelIndex, item) => {
    setSelectedItems(prev => {
      const newSelected = [...prev];
      newSelected[levelIndex] = item;
      // 하위 레벨 선택 초기화
      for (let i = levelIndex + 1; i < newSelected.length; i++) {
        newSelected[i] = null;
      }
      return newSelected;
    });
    
    // 하위 레벨 데이터 초기화
    setLevelData(prev => {
      const newData = [...prev];
      for (let i = levelIndex + 1; i < newData.length; i++) {
        newData[i] = [];
      }
      return newData;
    });
    
    // 다음 레벨 데이터 로드 - useEffect에서 처리됨
  };
  
  // 카드 편집 모달 열기
  const openEditModal = (levelIndex) => {
    setModalMode(levelIndex);
    setNewItemName('');
    setEditingItem(null);
    setIsDraggable(false);
    
    // 모달이 열릴 때 해당 레벨의 데이터를 다시 로드
    loadLevelData(levelIndex);
    
    setIsModalVisible(true);
  };
  
  // 모달 닫기
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingItem(null);
  };
  
  // 편집할 아이템 선택
  const handleEditItemSelect = (item) => {
    setEditingItem(item);
    setNewItemName(item);
  };
  
  // 항목 추가/수정 처리
  const handleAddOrUpdateItem = () => {
    if (!newItemName.trim()) return;
    
    const level = levels[modalMode];
    if (!level) return;
    
    // 상위 레벨 선택 항목들 수집
    const parentParams = [];
    for (let i = 0; i < modalMode; i++) {
      // 상위 레벨의 선택 여부 확인
      if (selectedItems[i] === null && modalMode > 0) {
        console.log(`상위 레벨 ${i+1}이 선택되지 않았습니다.`);
        return; // 상위 레벨이 선택되지 않으면 추가/수정 불가
      }
      parentParams.push(selectedItems[i]);
    }
    
    let success = false;
    
    // 매개변수 로깅
    console.log('모드:', modalMode, '레벨:', level.title);
    console.log('매개변수:', newItemName, parentParams);
    
    if (editingItem) {
      // 기존 항목 수정 - 항목이 선택되어 있어야 함
      if (level.updateItem) {
        success = level.updateItem(editingItem, newItemName, ...parentParams);
        console.log('수정 결과:', success);
      }
    } else {
      // 새 항목 추가 - 항목 선택 없이도 가능
      // 현재 레벨의 데이터에 이미 동일한 이름이 있는지 확인
      const currentItems = levelData[modalMode] || [];
      if (currentItems.includes(newItemName)) {
        // 이미 존재하는 항목인 경우 알림
        alert(`이미 존재하는 항목입니다: "${newItemName}"`);
        return;
      }
      
      if (level.addItem) {
        // 매개변수 수에 따라 적절히 호출
        if (modalMode === 0) {
          // 첫 번째 레벨은 항목 이름만 전달
          success = level.addItem(newItemName);
        } else if (modalMode === 1) {
          // 두 번째 레벨은 상위 항목과 이름 전달
          success = level.addItem(parentParams[0], newItemName);
        } else if (modalMode === 2) {
          // 세 번째 레벨은 두 개의 상위 항목과 이름 전달
          success = level.addItem(parentParams[0], parentParams[1], newItemName);
        } else if (modalMode === 3) {
          // 네 번째 레벨은 세 개의 상위 항목과 이름 전달
          success = level.addItem(parentParams[0], parentParams[1], parentParams[2], newItemName);
        }
        
        console.log('추가 결과:', success);
        
        // 추가 실패 시 원인 알림
        if (success === false) {
          alert(`항목 추가에 실패했습니다. 이미 존재하는 항목이거나 유효하지 않은 이름일 수 있습니다.`);
          return;
        }
      }
    }
    
    if (success !== false) { // null이나 undefined인 경우도 성공으로 처리
      // 데이터 다시 로드
      loadLevelData(modalMode);
      
      // 수정된 항목이 현재 선택된 항목인 경우, 선택 상태 업데이트
      if (editingItem && selectedItems[modalMode] === editingItem) {
        setSelectedItems(prev => {
          const newSelected = [...prev];
          newSelected[modalMode] = newItemName;
          return newSelected;
        });
        
        // 수정된 항목의 하위 레벨 데이터도 다시 로드
        for (let i = modalMode + 1; i < levels.length; i++) {
          if (selectedItems[i - 1] !== null) {
            loadLevelData(i);
          }
        }
      }
    }
    
    setNewItemName('');
    setEditingItem(null);
  };
  
  // 순서 변경 토글
  const toggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };
  
  // 드래그 앤 드롭 종료 처리
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }
    
    const level = levels[modalMode];
    if (!level) return;
    
    const items = levelData[modalMode];
    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
    
    if (oldIndex === -1 || newIndex === -1) return;
    
    const newOrder = arrayMove([...items], oldIndex, newIndex);
    
    // 상위 레벨 선택 항목들 수집
    const parentParams = [];
    for (let i = 0; i < modalMode; i++) {
      parentParams.push(selectedItems[i]);
    }
    
    // API 호출로 순서 변경 (각 컴포넌트의 API 구조에 맞게 호출)
    let success = false;
    
    if (level.reorderItems) {
      try {
        // 컴포넌트/레벨별 다른 API 호출 방식 사용
        if (modalMode === 0) {
          // FAQ 카테고리 등 1단계는 newOrder만 전달
          success = level.reorderItems(newOrder);
        } else if (modalMode === 1) {
          // 2단계는 상위항목과 newOrder 전달
          success = level.reorderItems(parentParams[0], newOrder);
        } else if (modalMode === 2) {
          // 3단계 QNA 항목 등은 카테고리, 서브카테고리, newOrder 전달
          success = level.reorderItems(parentParams[0], parentParams[1], newOrder);
        } else if (modalMode === 3) {
          // 4단계는 모든 상위 항목과 newOrder 전달
          success = level.reorderItems(parentParams[0], parentParams[1], parentParams[2], newOrder);
        }
        console.log('순서변경 결과:', success);
      } catch (error) {
        console.error('순서변경 에러:', error);
        success = false;
      }
    }
    
    if (success !== false) {
      // UI 업데이트는 API 호출 성공 여부와 관계없이 수행 (즉시 피드백 제공)
      setLevelData(prev => {
        const newData = [...prev];
        newData[modalMode] = newOrder;
        return newData;
      });
    }
  };
  
  // 카드 항목 삭제 처리
  const handleDeleteItem = (item) => {
    const level = levels[modalMode];
    if (!level || !level.deleteItem) return;
    
    // 상위 레벨 선택 항목들 수집
    const parentParams = [];
    for (let i = 0; i < modalMode; i++) {
      parentParams.push(selectedItems[i]);
    }
    
    // API 호출로 항목 삭제
    const success = level.deleteItem(item, ...parentParams);
    
    if (success !== false) {
      // 데이터 다시 로드
      loadLevelData(modalMode);
      
      // 삭제된 항목이 선택된 항목인 경우 선택 상태 초기화
      if (selectedItems[modalMode] === item) {
        setSelectedItems(prev => {
          const newSelected = [...prev];
          newSelected[modalMode] = null;
          // 하위 레벨 선택 및 데이터 초기화
          for (let i = modalMode + 1; i < newSelected.length; i++) {
            newSelected[i] = null;
          }
          return newSelected;
        });
        
        setLevelData(prev => {
          const newData = [...prev];
          // 하위 레벨 데이터 초기화
          for (let i = modalMode + 1; i < newData.length; i++) {
            newData[i] = [];
          }
          return newData;
        });
      }
    }
  };
  
  // 모달 내용 렌더링
  const renderModalContent = () => {
    const level = levels[modalMode];
    if (!level) return null;
    
    const items = levelData[modalMode] || [];
    const title = level.title || `레벨 ${modalMode + 1}`;
    
    return (
      <ModalContent>
        <CategoryCard title={title}>
          <ListContainer>
            {isDraggable ? (
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={items} 
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((item) => (
                    <SortableListItem 
                      key={item}
                      id={item}
                      item={item}
                      onDelete={() => handleDeleteItem(item)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <List
                dataSource={items}
                renderItem={item => (
                  <ListItem 
                    className={editingItem === item ? 'selected' : ''}
                    onClick={() => handleEditItemSelect(item)}
                  >
                    <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                      <span>{item}</span>
                      <Button 
                        size="small" 
                        danger 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item);
                          if (editingItem === item) {
                            setEditingItem(null);
                            setNewItemName('');
                          }
                        }}
                      >
                        삭제
                      </Button>
                    </Space>
                  </ListItem>
                )}
              />
            )}
          </ListContainer>
          <CardFooter>
            <Button 
              icon={<DragOutlined />} 
              onClick={toggleDraggable}
              disabled={false}  // 항상 활성화
            >
              {isDraggable ? '순서변경 완료' : '순서변경'}
            </Button>
          </CardFooter>
        </CategoryCard>
        
        <EditCard title={editingItem ? '수정' : '추가'}>
          <EditForm>
            <div>
              <Text strong>이름</Text>
              <Input
                placeholder={`${title} 이름 입력`}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                style={{ marginTop: 8 }}
              />
            </div>
            <Space>
              <Button 
                type="primary" 
                icon={editingItem ? <EditOutlined /> : <PlusOutlined />} 
                onClick={handleAddOrUpdateItem}
              >
                {editingItem ? '수정' : '추가'}
              </Button>
              {editingItem && (
                <Button 
                  onClick={() => {
                    setEditingItem(null);
                    setNewItemName('');
                  }}
                >
                  취소
                </Button>
              )}
            </Space>
          </EditForm>
        </EditCard>
      </ModalContent>
    );
  };
  
  return (
    <div>
      <Row gutter={[20, 20]}>
        {levels.map((level, index) => {
          // 상위 레벨이 선택되지 않은 경우 하위 레벨 카드는 렌더링하지 않음
          if (index > 0 && !selectedItems[index - 1]) return null;
          
          // 해당 레벨의 제목 설정 (선택된 항목 포함)
          let title = level.title || `레벨 ${index + 1}`;
          if (index > 0 && selectedItems[index - 1]) {
            title = `${title} - ${selectedItems[index - 1]}`;
          }
          
          return (
            <Col key={`level-${index}`}>
              <CategoryCard title={title}>
                <ListContainer>
                  <List
                    dataSource={levelData[index] || []}
                    renderItem={item => (
                      <ListItem
                        className={selectedItems[index] === item ? 'selected' : ''}
                        onClick={() => handleItemSelect(index, item)}
                      >
                        {item}
                      </ListItem>
                    )}
                  />
                </ListContainer>
                <CardFooter>
                  <Button 
                    icon={<EditOutlined />} 
                    onClick={() => openEditModal(index)}
                  >
                    편집
                  </Button>
                </CardFooter>
              </CategoryCard>
            </Col>
          );
        })}
      </Row>
      
      {/* 편집 모달 */}
      <Modal
        title={`${levels[modalMode]?.title || `레벨 ${modalMode + 1}`} 편집`}
        open={isModalVisible}
        onCancel={handleModalCancel}
        width={700}
        footer={null}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default CategoryForm; 