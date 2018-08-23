import styled from "styled-components";
import Dropzone from "react-dropzone";

export const File = styled(Dropzone)`
  border: 2px dashed #ff3333;
  width: 100%;
  max-width: 660px;
  font-size: 16px;
  color: #777777;
  text-align: center;
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-gap: 5px;
  background-color: #fff;
  color: #444;
  &.without-files {
    display: flex;
  }
  img {
    width: 100px;
  }
  p {
    margin-top: 15px;
    border: none !important;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #cccccc;
    &::placeholder {
      color: #999999;
    }
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16px;
    font-weight: bold;
    color: #999999;
    text-decoration: none;
  }
  div.actions {
    display: flex;
    margin-top: 15px;
    width: 100%;
    justify-content: space-between;
    button {
      color: #ffffff;
      font-size: 16px;
      background: #fc6963;
      height: 56px;
      border: 0;
      border-radius: 5px;
      padding: 0 30px;
      &.cancel {
        background: #222222;
      }
    }
  }
`;
