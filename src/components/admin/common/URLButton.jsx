import { Button, message, Tooltip } from 'antd';

const URLButton = ({ url }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'URL이 복사되었습니다.',
      duration: 1.5,
    });
  };

  return (
    <>
      {contextHolder}
      <Tooltip placement="top" title={url}>
        <Button style={{ height: 'auto' }} type="link" onClick={() => {
          navigator.clipboard.writeText(url);
          success();
        }}>
          URL 복사
        </Button>
      </Tooltip>
    </>
  );
};

export default URLButton;

