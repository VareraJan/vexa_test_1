import React from 'react';
import { Btn, ErrorMessage, InputBlock } from '../../../styled/dashboard';
import { ChatData } from '../MenuChatGroup/MenuChatGroup';
import { Container } from './CreateChatGroup.styled';

interface CreateChatGroupProps {
  createError: string | undefined;
  chatData: ChatData;
  setChatData: (arg: any) => void;
  submitHandler: () => void;
}

const CreateChatGroup: React.FC<CreateChatGroupProps> = ({
  createError,
  chatData,
  setChatData,
  submitHandler,
}) => {
  return (
    <Container>
      
      <InputBlock>
        <label>Group Name</label>
        <input
          name='groupName'
          value={chatData.groupName}
          onChange={(e) =>
            setChatData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          type='text'
          placeholder='Group Name'
        />
      </InputBlock>
      <InputBlock>
        <label>Short Description</label>
        <textarea
          name='description'
          value={chatData.description}
          onChange={(e) =>
            setChatData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          placeholder='Type'
        />
      </InputBlock>
      <InputBlock>
        <label>What Restrictions</label>
        <div className='btn-group'>
          <Btn
            onClick={() => setChatData((prev: any) => ({ ...prev, access: 'all' }))}
            width='140px'
            marginRight='12px'
            active={chatData.access === 'all'}>
            Apply + Commit
          </Btn>
          <Btn
            width='100px'
            marginRight='12px'
            onClick={() => setChatData((prev: any) => ({ ...prev, access: 'commit' }))}
            active={chatData.access === 'commit'}>
            Commit
          </Btn>
          <Btn
            onClick={() => setChatData((prev: any) => ({ ...prev, access: 'apply' }))}
            active={chatData.access === 'apply'}
            marginRight='102px'
            width='100px'>
            Apply
          </Btn>
          <Btn width='192px' active save onClick={submitHandler}>
            Submit
          </Btn>
        </div>
      </InputBlock>
      {createError && <ErrorMessage>{createError}</ErrorMessage>}
    </Container>
  );
};

export default CreateChatGroup;
