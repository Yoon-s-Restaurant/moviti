import * as React from 'react';
import Label from '../common/input/Label';
import { Input } from '../common/input';
import { Button } from '../common/button';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

interface SignUpFormProps {
  handleSubmit: () => void;
}

const SignUpForm = ({ handleSubmit }: SignUpFormProps) => {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  return (
    <>
      <SignUpFormBlock>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <InputWrapper>
              <Label htmlFor={'name'}>이름 :</Label>
              <Input
                id={'name'}
                type={'name'}
                serial={'upper'}
                value={name}
                onChange={onChangeName}
                placeholder={'이름 (2자 이상)'}
                autoComplete={'off'}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor={'email'}>이메일:</Label>
              <Input
                id={'email'}
                type={'email'}
                serial={'middle'}
                value={email}
                onChange={onChangeEmail}
                placeholder={'이메일 (example@gmail.com)'}
                autoComplete={'off'}
              />
            </InputWrapper>
            <div>
              <Label htmlFor={'password'}>비밀번호:</Label>
              <Input
                id={'password'}
                type={'password'}
                serial={'lower'}
                value={password}
                onChange={onChangePassword}
                placeholder={'영문, 숫자, 특수문자 조합 10자 이상'}
                autoComplete={'off'}
              />
            </div>
          </FormWrapper>
          <Button color={'primary'} height={48} unit={'px'}>
            회원가입
          </Button>
        </form>
      </SignUpFormBlock>
    </>
  );
};
export default SignUpForm;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 0.5em;
`;
const SignUpFormBlock = styled.div`
  width: 30vw;
  min-width: 300px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
`;

const InputWrapper = styled.div`
  border-bottom: 1px solid lightgray;
`;
