class ListFeatureProductDTO {
  id?: string
  name: string;
  description: string;
}

class ListImageProductDTO {
  id?: string
  url: string;
  description: string;
}

export class ListProductDTO {
  id: string
  name: string
  value: number;
  quantityAvailable: number;
  description: string;
  category: string
  details: ListFeatureProductDTO[];
  images: ListImageProductDTO[]
}