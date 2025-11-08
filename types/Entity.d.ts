interface Car {
  _id: string;
  title: string;
  make: string;
  model: string;
  manufacturing_year: number;
  condition: string;
  body_type: string;
  engine?: string;
  cylinders: string;
  doors: string;
  horsepower?: string;
  fuel_type: string;
  gear_type: string;
  drive_train?: string;
  exterior_color: string;
  interior_color: string[];
  chasis_no: string;
  engine_no: string;
  location: string;
  price: number;
  currency: string;
  mileage: number;
  mileage_unit: string;
  description?: string;
  images: string[];
  should_list_on_website: boolean;
  reserved_by: string | null;
  clicks: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface MostSearchedCarsResponse {
  status: string; // "success"
  result: number; // number of cars returned (6)
  data: Car[];
}

interface CarsResponse {
  status: string; // "success"
  data: Car[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface MessagesResponse {
  success: boolean;
  messages: {
    _id: string;
    thread: string;
    sender: "user" | "admin";
    content: string;
    type?: "text" | "file";
    fileName?: string;
    fileUrl?: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
