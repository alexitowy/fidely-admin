export interface MessageToast {
  severity?:
    | 'info'
    | 'success'
    | 'warn'
    | 'error';
  summary?: string;
  detail?: string;
  id?: any;
  key?: 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br' | 'center';
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  contentStyleClass?: string;
  styleClass?: string;
  closeIcon?: string;
}
