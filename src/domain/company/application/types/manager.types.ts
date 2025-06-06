export type ManagerDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
};

export type CreateManagerInputDto = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
};

export type CreateManagerOutputDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetManagerByIdInputDto = {
  id: string;
};

export type GetManagerByIdOutputDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateManagerInputDto = Partial<ManagerDto>;
export type UpdateManagerOutputDto = CreateManagerOutputDto;

export type DeleteManagerInputDto = {
  id: string;
};

export type DeleteManagerOutputDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllManagersOutputDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}[];
