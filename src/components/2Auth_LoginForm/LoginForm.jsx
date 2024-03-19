import { Button, Checkbox, Form, Input } from "antd";
import * as usersService from "../../utilities/0usersService";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  // const onFinish = async (values) => {
  //   try {
  //     const user = await usersService.logIn(values);
  //     setUser(user);
  //     console.log(data1PaintSvcs);
  //     Navigate("/user/info", { state: { data1PaintSvcs } });        //* pass the prelogin form data into postlogin environment
  //     console.log(user);
  //     console.log(data1PaintSvcs);
  //   } catch {
  //     //? User-error validation #1
  //     setError(
  //       "The email and password you specified are invalid. Please try again."
  //     );
  //   }
  // };
  const onFinish = async (values) => {
    try {
      const user = await usersService.logIn(values);
      setUser(user);
      //* doesnt need to be moved as state. localStorage is a global component...
      console.log(localStorage);          
      
      //* condition to enter as Admin or User
      //* admittedly not the most secure manner
      console.log(user.admin);
      if (!user.admin) {   if (
        localStorage.data1Key !== null && localStorage.data1Key !== undefined) {//? this works. but localStorage remembers...
        Navigate("/user/cart");             
      } else {
        //* no need to pass the prelogin form data into postlogin environment, localStorage is global.  
        Navigate("/user/info");           
      }
      console.log(user);                  //? please remove in the future
      } else
      {
        Navigate("/user/admin");
      }
    

    } catch {
      //? User-error validation #1
      setError(
        "The email and password you specified are invalid. Please try again."
      );
    }
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  //   setError("The email and password you specified are invalid. Please try again.");
  // };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <h2 style={{ fontFamily: "Palatino Linotype", margin: '5% 0 0 9%'}}> Login </h2>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email address",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox >Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button style={{ backgroundColor: "#01628f" }} type="primary" htmlType="submit">
            Login
          </Button>

          {/* //? User-error validation #2 */}
          <p className="error-message" style={{ color: "red" }}>
            &nbsp;{error}
          </p>
        </Form.Item>
        <p style={{ textAlign: 'center', margin: '0 0 12.7% 0'}}>New to Condotierre?  <Link to="/signup" style={{ color: '#478e80'}}>Sign up here</Link> </p>

      </Form>

      {/* <p style={{ textAlign: 'center'}}>New to Condotierre?  <Link to="/signup">Sign up here</Link> </p> */}

    </>
  );
}

//* old code
/* <div className="form-container">
         J: i want to import styles, ask tomorrow 
        <form>
          {/* <h2> Login</h2>
          <label>Email</label>
          <input type="email" required />
          <br />
          <br />

          <label>Password</label>
          <input type="password" required />
          <br />
          <br />

          <button type="login">Login</button>
          <p>
            <i>Don't have an account? Sign up now </i>
          </p> 
          {/* J: potentially 'Sign up now' is hyperlink to Signup component 
        //? try AUI code
      
        </form>
      </div> */
