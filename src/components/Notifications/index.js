import React, { useState, useEffect, useMemo } from 'react';

import { MdNotifications, MdAccessTime } from 'react-icons/md';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
  TimeIcon,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(pNotification) {
    await api.put(`notifications/${pNotification._id}`);
    setNotifications(
      notifications.map(notification =>
        notification._id === pNotification._id
          ? { ...notification, read: !pNotification.read }
          : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#19181f" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <div>
                <time>
                  <TimeIcon>
                    <MdAccessTime />
                  </TimeIcon>
                  {notification.timeDistance}
                </time>
              </div>
              <button
                type="button"
                onClick={() => handleMarkAsRead(notification)}
              >
                Marcar como {notification.read && 'não'} lida
              </button>
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
