export interface MenuItem {
  id: number;
  title: string;
  target: string;
  children?: MenuItem[];
  visible?: boolean;
}
