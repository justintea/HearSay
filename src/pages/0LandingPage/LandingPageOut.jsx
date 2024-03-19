import AudioInputForm from "../../components/1ServicesPage/AudioInputForm";
import { Layout, Flex, Carousel, Divider } from "antd";
const { Sider, Content } = Layout;
import { Outlet, useOutletContext } from "react-router-dom";
import { useState } from "react";

const contentStyle = {
  textAlign: "center",
  minHeight: 570,
  lineHeight: "120px",
  // color: '#fff',
  // backgroundColor: '#0958d9',
  color: "black",
  backgroundColor: "#eae8f4",
  // width: '40%',
};

const siderStyle = {
  textAlign: "left",
  justifyContent: "top",
  lineHeight: "25px",
  color: "black",
  backgroundColor: "white",
  // width: '60%',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(100% )",
  maxWidth: "calc(100% )",
};

export default function LandingPageOut() {
  
  const [responseMessage, setResponseMessage] = useState("");

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useOutletContext();

  return (
    <>
      <Flex gap="middle" wrap="wrap">
        <Layout style={layoutStyle}>
          <Layout>
            <Content style={contentStyle}>

            <Divider orientation="left" style={{ margin: "0px" }}> <h2 style={{ fontFamily: 'Alkatra' }}> Input </h2> </Divider>
                <AudioInputForm setResponseMessage={setResponseMessage} />
            </Content>

            <Sider width="55%" style={siderStyle}>
            <Divider orientation="left" style={{margin: "0px" }}> <h2 style={{ fontFamily: 'Alkatra'}}> Summary of sound file </h2> </Divider>

              <div style={{ margin: '0 0 0 2%', whiteSpace: 'pre-wrap' }}>
    {responseMessage.responseData && responseMessage.responseData.content}
  </div>

            </Sider>
          </Layout>
        </Layout>
      </Flex>
    </>
  );
}
