import { Button, Form, Input, Select, Space, message, Upload } from "antd";
const { Option } = Select;
import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';



export default function AudioInputForm({ user, setUser, setResponseMessage }) {

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [form] = Form.useForm();
  const Navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    let concertValuesArray = values; 
    console.log('this is values: ', values);
    console.log('this is valuesArray: ', concertValuesArray);
    console.log(user);

    if (user === null) {
      localStorage.setItem("data1Key", JSON.stringify(concertValuesArray));
      console.log(localStorage);
      //! stay on the page, upon click
      // Navigate('/login');      //* head to loginPage to login
  
      //* postlogin 
      } else {
      localStorage.setItem("data1Key", JSON.stringify(concertValuesArray));
      console.log(localStorage);
      //! stay on the page, upon click
      // Navigate('/user/cart');
      }

    //! next time this should be at prayerService & prayerAPI files
    try {
      const response = await fetch("/api/sendData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
         //! stay on the page, upon click
        console.log('Response is ok');
        const responseData = await response.json();
        // Handle success, e.g., navigate to the output page
        // setResponseMessage(responseData.message);
        setResponseMessage(responseData);

        // // Handle success, e.g., navigate to the output page
        // Navigate("/user/cart");
      } else {
        // Handle error
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

    
  }


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //? upload button 
  const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  
  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          textAlign: 'center',
        }}>
          
        <Form.Item >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select audio</Button>
          </Upload>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button
              type="primary"
              style={{ backgroundColor: "#01628f", margin: '0 0 0 -100%' }}
              // style={{ backgroundColor: "#01628f"}}
              htmlType="submit"
            >
              Generate audio summary
            </Button>
          </Space>
        </Form.Item>
        </Form>
        </div>
    </>
  );
}
