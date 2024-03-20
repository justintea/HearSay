import { Button, Form, Input, Select, message, Upload } from "antd";
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

  // const [form] = Form.useForm();
  // const Navigate = useNavigate();
  const [fileList, setFileList] = useState([]);


  const onFinish = async (values) => {

    console.log("Success:", values);
    console.log('this is values: ', values);
    // console.log(user);

    //! 1. user-related functions
    if (user === null) {
      localStorage.setItem("data1Key", JSON.stringify(values));
      console.log(localStorage);
      //! stay on the page, upon click
      // Navigate('/login');      //* head to loginPage to login
  
      //* postlogin 
      } else {
      localStorage.setItem("data1Key", JSON.stringify(values));
      console.log(localStorage);
      //! stay on the page, upon click
      // Navigate('/user/cart');
      }

    //! 2. Openai POST request function
    //! next time this should be at ABC-Service & ABC-API files
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

    //! 3. AWS S3 bucket request function (switch upward later)
// Your form submission logic here, using formData instead of values
// try {
//   const response = await fetch("/api/sendData", {
//     method: "POST",
//     body: formData, // Send formData instead of JSON.stringify(values)
//   });

//   if (response.ok) {
//     const responseData = await response.json();
//     setResponseMessage(responseData);
//   } else {
//     console.error("Failed to send data");
//   }
// } catch (error) {
//   console.error("Error sending data:", error);
// }
};

    
  



  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //? upload button 
  // const props = {
  //   name: 'file',
  //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };


  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

      <Form
        {...layout}
        // form={form}
          // name="control-hooks"
        onFinish={onFinish}
        // onFinish={(values) => {console.log({ values }); }}
        onFinishFailed={onFinishFailed}
        style={{
          maxWidth: 600,
          textAlign: 'center',
        }}
          >
          
          <Form.Item
            name={'audioFile'}
            // dont know what propname does. understand 149 n 150
            valuePropName="fileList"
            getValueFromEvent={(event) => {
              return event?.fileList;
            }}
            rules={[
              {
                required: true,
                message: 'Please select a file.'
              },
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    if (fileList && fileList[0].size > 500000) {
                      reject('File size exceeded');
                      message.error('File size exceeded');
                    }
                    else {
                      resolve('Success');
                    }
                  });
              },
              },
            ]}
          >
          {/* <Upload {...props}> */}
          <Upload
              maxCount={1}
              beforeUpload={(file) => {
                return new Promise((resolve, reject) => {
                  if (file.size > 500000) {
                    reject('File size exceeded');
                    message.error('File size exceeded');
                  }
                  else {
                    resolve('Success');
                  }
                })
              }}
              customRequest={(info) => {
                setFileList([info.file]);

               }}
              showUploadList={false}
          >
              <Button icon={<UploadOutlined />}>Select audio</Button>
              {fileList[0]?.name}
          </Upload>
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button
              type="primary"
              style={{ backgroundColor: "#01628f", margin: '0 0 0 -100%' }}
              // style={{ backgroundColor: "#01628f"}}
              htmlType="submit"
            >
              Generate audio summary
            </Button>
        </Form.Item>
        </Form>
        </div>
    </>
  );
}


//* logs
//? file upload - prevent form submission without file, remove loading animation, show static filename, submit button passes file data & execute next steps
// credit: https://www.youtube.com/watch?v=2EPfEnNwtWU


// import { Button, Form, Input, Select, Space, message, Upload } from "antd";
// const { Option } = Select;
// import { useState, useEffect } from "react";
// import { Route, Routes, Link, useNavigate } from "react-router-dom";
// import { UploadOutlined } from '@ant-design/icons';

// // import { useForm } from 'react-router-form';
  
// const BUCKET_NAME = 'hearsay-20240319';
// // const BUCKET_NAME = '';
// const REGION = 'ap-southeast-1';
// // const REGION = 'Asia Pacific (Singapore) ap-southeast-1';


// export default function AudioInputForm({ user, setUser, setResponseMessage }) {

//   const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };
//   const tailLayout = {
//     wrapperCol: {
//       offset: 8,
//       span: 16,
//     },
//   };

//   const [form] = Form.useForm();
//   const [file, setFile] = useState([]);

//   // const Navigate = useNavigate();

//   const onFinish = async (values) => {
//     console.log("Success:", values);
//     let audioValuesArray = values; 
//     console.log('this is values: ', values);
//     console.log('this is valuesArray: ', audioValuesArray);
//     console.log(user);

//     //! user-access related code
//     if (user === null) {
//       localStorage.setItem("data1Key", JSON.stringify(audioValuesArray));
//       console.log(localStorage);
//       //! stay on the page, upon click
//       // Navigate('/login');      //* head to loginPage to login
  
//       //* postlogin 
//       } else {
//       localStorage.setItem("data1Key", JSON.stringify(audioValuesArray));
//       console.log(localStorage);
//       //! stay on the page, upon click
//       // Navigate('/user/cart');
//       }

//     //! 2 step process. 1st step: audio file to S3, 2nd step: S3 as url to OPENAPI
//     if (!file) {
//       return message.error('Please select an audio file');
//     }

//     const fileUrl = await handleUpload(file);
//     console.log("Uploaded file URL:", fileUrl);
    

//     try {
//       // Create a FormData object to send the file
//       const formData = new FormData();
//       formData.append('file', file);
  
//       // Make a POST request to your backend endpoint to upload the file
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to upload file');
//       }
  
//       // If the upload is successful, parse the response to get the file URL
//       const data = await response.json();
//       const fileUrl = data.fileUrl; // Adjust this according to your backend response structure
  
//       // Return the URL of the uploaded file
//       return fileUrl;
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       // Handle error (e.g., display an error message)
//       message.error('Failed to upload file. Please try again.');
//       // You can also throw the error if you want the caller to handle it
//       throw error;
//     }
//   };








//     //! next time this should be at ABC-Service & ABC-API files
//     try {
//       const response = await fetch("/api/sendData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (response.ok) {
//          //! stay on the page, upon click
//         console.log('Response is ok');
//         const responseData = await response.json();
//         // Handle success, e.g., navigate to the output page
//         // setResponseMessage(responseData.message);
//         setResponseMessage(responseData);

//         // // Handle success, e.g., navigate to the output page
//         // Navigate("/user/cart");
//       } else {
//         // Handle error
//         console.error("Failed to send data");
//       }
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }

    
//   }


//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };



//   const handleUpload = async () => {

//     const fileData = new FormData();
//     fileData.append('file', file);

//     const file = await UploadOutlined(fileData);
//     console.log('name of selected file %o:', file.name);
//     const fileUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${file.name}`;
//     console.log('fileURl %o: ', fileUrl);
//     setValue('audio: ', fileUrl);
//   };




//   function sanitizeFileName(fileName) {
//     return fileName.replace(/[^a-zA-Z0-9-]/g, "_");
//   }



//   //? upload button 
//   const props = {
//     name: 'file',
//     multiple: false,
//     // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//     // headers: {
//     //   authorization: 'authorization-text',
//     // },
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//         setFile(file.originFileObj);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };


//   return (
//     <>
//           <div style={{ display: 'flex', justifyContent: 'center' }}>

//       <Form
//         {...layout}
//         form={form}
//         name="control-hooks"
//         onFinish={onFinish}
//         style={{
//           maxWidth: 600,
//           textAlign: 'center',
//         }}>
          
//         <Form.Item >
//           <Upload {...props}>
//             <Button icon={<UploadOutlined />}>Select audio</Button>
//           </Upload>
//         </Form.Item>

//         <Form.Item {...tailLayout}>
//           <Space>
//             <Button
//               type="primary"
//               style={{ backgroundColor: "#01628f", margin: '0 0 0 -100%' }}
//               // style={{ backgroundColor: "#01628f"}}
//               htmlType="submit"
//             >
//               Generate audio summary
//             </Button>
//           </Space>
//         </Form.Item>
//         </Form>
//         </div>
//     </>
//   );
// }



//? save pt 20240319 
// import { Button, Form, Input, Select, Space, message, Upload } from "antd";
// const { Option } = Select;
// import { useState, useEffect } from "react";
// import { Route, Routes, Link, useNavigate } from "react-router-dom";
// import { UploadOutlined } from '@ant-design/icons';



// export default function AudioInputForm({ user, setUser, setResponseMessage }) {

//   const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };
//   const tailLayout = {
//     wrapperCol: {
//       offset: 8,
//       span: 16,
//     },
//   };

//   const [form] = Form.useForm();
//   // const Navigate = useNavigate();

//   const onFinish = async (values) => {
//     console.log("Success:", values);
//     let concertValuesArray = values; 
//     console.log('this is values: ', values);
//     console.log('this is valuesArray: ', concertValuesArray);
//     console.log(user);

//     if (user === null) {
//       localStorage.setItem("data1Key", JSON.stringify(concertValuesArray));
//       console.log(localStorage);
//       //! stay on the page, upon click
//       // Navigate('/login');      //* head to loginPage to login
  
//       //* postlogin 
//       } else {
//       localStorage.setItem("data1Key", JSON.stringify(concertValuesArray));
//       console.log(localStorage);
//       //! stay on the page, upon click
//       // Navigate('/user/cart');
//       }

//     //! next time this should be at ABC-Service & ABC-API files
//     try {
//       const response = await fetch("/api/sendData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (response.ok) {
//          //! stay on the page, upon click
//         console.log('Response is ok');
//         const responseData = await response.json();
//         // Handle success, e.g., navigate to the output page
//         // setResponseMessage(responseData.message);
//         setResponseMessage(responseData);

//         // // Handle success, e.g., navigate to the output page
//         // Navigate("/user/cart");
//       } else {
//         // Handle error
//         console.error("Failed to send data");
//       }
//     } catch (error) {
//       console.error("Error sending data:", error);
//     }

    
//   }



//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   //? upload button 
//   const props = {
//     name: 'file',
//     action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };


//   return (
//     <>
//           <div style={{ display: 'flex', justifyContent: 'center' }}>

//       <Form
//         {...layout}
//         form={form}
//         name="control-hooks"
//         onFinish={onFinish}
//         style={{
//           maxWidth: 600,
//           textAlign: 'center',
//         }}>
          
//         <Form.Item >
//           <Upload {...props}>
//             <Button icon={<UploadOutlined />}>Select audio</Button>
//           </Upload>
//         </Form.Item>

//         <Form.Item {...tailLayout}>
//           <Space>
//             <Button
//               type="primary"
//               style={{ backgroundColor: "#01628f", margin: '0 0 0 -100%' }}
//               // style={{ backgroundColor: "#01628f"}}
//               htmlType="submit"
//             >
//               Generate audio summary
//             </Button>
//           </Space>
//         </Form.Item>
//         </Form>
//         </div>
//     </>
//   );
// }
