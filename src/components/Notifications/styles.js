import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
  ${props =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #f92727;
        content: '';
        border-radius: 50%;
      }
    `}
`;

export const NotificationList = styled.div`
  z-index: 10;
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.8);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;
  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  p {
    font-size: 13px;
    line-height: 18px;
  }

  div {
    display: block;
  }

  time {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 10px;
    opacity: 0.6;
  }
  button {
    font-size: 10px;
    border: 0;
    background: none;
    color: ${lighten(0.1, '#5edfff')};
    &:hover {
      text-decoration: underline;
    }
  }

  ${props =>
    props.unread &&
    css`
      &&::after {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        background: ${lighten(0.1, '#f92727')};
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;

export const TimeIcon = styled.div`
  margin-right: 3px;
`;
