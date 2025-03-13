const SERVER_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:9000';

export interface Item {
  id: number;
  name: string;
  category: string;
  image_name: string;
}

export interface ItemListResponse {
  items: Item[];
}

export const fetchItems = async (): Promise<ItemListResponse> => {
  const response = await fetch(`${SERVER_URL}/items`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch items from the server');
  }

  return response.json();
};

export interface CreateItemInput {
  name: string;
  category: string;
  image: File;
}

export const postItem = async (input: CreateItemInput): Promise<Response> => {
  const data = new FormData();
  data.append('name', input.name);
  data.append('category', input.category);

  if (input.image) {
    data.append('image', input.image);
  } else {
    console.error("🚨 No image selected!");
    throw new Error("No image selected");
  }

  console.log("📤 Sending FormData:", Object.fromEntries(data));

  try {
    const response = await fetch(`${SERVER_URL}/items`, {
      method: 'POST',
      mode: 'cors',
      body: data, // Do NOT set headers manually
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`❌ POST failed: ${response.status} - ${errorMessage}`);
      throw new Error(`Failed to post item: ${response.status} - ${errorMessage}`);
    }

    console.log("✅ POST success");
    return response;
  } catch (error) {
    console.error("🚨 POST error:", error);
    throw error;
  }
};
