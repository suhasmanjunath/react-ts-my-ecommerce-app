import axios from 'axios';

const API_URL = 'https://gpt-4o.p.rapidapi.com/chat/completions';


export interface Product {
    id: number;
    name: string;
    description: string;
    // Add other product properties as needed
  }

export const getRecommendations = async (userPreferences: string): Promise<Product[]> => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: userPreferences }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": "gpt-4o.p.rapidapi.com",
          "x-rapidapi-key": "", // Replace with your API key
        },
      }
    );

    // Log the full response to check the structure
    console.log('API Response:', response.data);
    const jsonString = response.data.choices[0].message.content.match(/```json\n([\s\S]*?)\n```/)[1];;
    console.log('JSON Extract Response:', jsonString);
    // Assuming the response has a field 'recommendations' that contains an array of products
    return JSON.parse(jsonString) || [];  // Adjust if the structure is different
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];  // Return empty array in case of error
  }
};