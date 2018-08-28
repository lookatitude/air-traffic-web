export interface Message {
  data?: { [key: string]: string };
  notification?: Notification;
  android?: AndroidConfig;
  token?: string;
  topic?: string;
  condition?: string;
}

export interface Notification {
  title?: string;
  body?: string;
}

export interface AndroidConfig {
  collapseKey?: string;
  priority?: ('high' | 'normal');
  ttl?: number;
  restrictedPackageName?: string;
  data?: { [key: string]: string };
  notification?: AndroidNotification;
}

export interface AndroidNotification {
  title?: string;
  body?: string;
  icon?: string;
  color?: string;
  sound?: string;
  tag?: string;
  clickAction?: string;
  bodyLocKey?: string;
  bodyLocArgs?: string[];
  titleLocKey?: string;
  titleLocArgs?: string[];
}
