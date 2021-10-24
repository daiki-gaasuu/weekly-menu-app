export interface Menu {
  name: string;
  ingredients: string[];
}

export interface PastMenu {
  name: string;
  ingredients: string[];
}

export interface WeeklyMenu {
  date: string;
  menus?: Menu[];
  name?: string;
}
