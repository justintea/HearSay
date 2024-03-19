import { Button, Form, Upload } from 'antd';

export default function AudioInputForm() {
  return (<>
    <Form
      onFinish={(values) => {
        console.log({ values });
      }}
    >
      <Form.Item label='profile pic' name={'profilePicture'}>
        <Upload>
          <Button> Upload profile pic </Button>
        </Upload>
      </Form.Item>

      <Button type='primary' htmlType='submit'>
        Submit
      </Button>


    </Form>
  </>);
}